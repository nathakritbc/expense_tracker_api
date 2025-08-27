import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { Injectable } from '@nestjs/common';
import { Builder, StrictBuilder } from 'builder-pattern';
import { GetAllMetaType } from 'src/types/utility.type';
import { UserId } from 'src/users/applications/domains/user.domain';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseId, IExpense } from '../../applications/domains/expense.domain';
import {
  ExpenseReportReturnType,
  ExpenseRepository,
  ExpensesByCategory,
  GetAllExpensesQuery,
  GetAllExpensesReturnType,
  GetExpenseReportQuery,
  UpdateExpenseCommand,
} from '../../applications/ports/expense.repository';
import { ExpenseEntity } from './expense.entity';

@Injectable()
export class ExpenseTypeOrmRepository implements ExpenseRepository {
  constructor(private readonly expenseModel: TransactionHost<TransactionalAdapterTypeOrm>) {}

  async create(expense: IExpense): Promise<IExpense> {
    const uuid = uuidv4() as ExpenseId;
    const expenseEntity = Builder<ExpenseEntity>()
      .uuid(uuid)
      .title(expense.title)
      .amount(expense.amount)
      .date(expense.date)
      .category(expense.category)
      .notes(expense.notes)
      .userId(expense.userId)
      .build();

    const resultCreated = await this.expenseModel.tx.getRepository(ExpenseEntity).save(expenseEntity);
    return ExpenseTypeOrmRepository.toDomain(resultCreated as ExpenseEntity);
  }

  async deleteByIdAndUserId({ id, userId }: { id: ExpenseId; userId: UserId }): Promise<void> {
    await this.expenseModel.tx.getRepository(ExpenseEntity).delete({
      uuid: id,
      userId: userId,
    });
  }

  async getAll(params: GetAllExpensesQuery): Promise<GetAllExpensesReturnType> {
    const { search, sort, order, page, limit, userId, category, startDate, endDate } = params;

    const currentPage = page ?? 1;
    const currentLimit = limit ?? 10;

    const queryBuilder = this.expenseModel.tx.getRepository(ExpenseEntity).createQueryBuilder('expense');

    // Filter by user (always required)
    queryBuilder.where('expense.userId = :userId', { userId });

    // Search in title or notes
    if (search) {
      queryBuilder.andWhere('(expense.title LIKE :search OR expense.notes LIKE :search)', {
        search: `%${search}%`,
      });
    }

    // Filter by category
    if (category) {
      queryBuilder.andWhere('expense.category = :category', { category });
    }

    // Filter by date range
    if (startDate) {
      queryBuilder.andWhere('expense.date >= :startDate', { startDate });
    }
    if (endDate) {
      queryBuilder.andWhere('expense.date <= :endDate', { endDate });
    }

    // Sorting
    const sortableColumns = ['title', 'amount', 'date', 'category', 'createdAt'];
    if (sort && sortableColumns.includes(sort)) {
      queryBuilder.orderBy(`expense.${sort}`, order === 'ASC' ? 'ASC' : 'DESC');
    } else {
      queryBuilder.orderBy('expense.date', 'DESC'); // Default sort by date descending
    }

    // Pagination
    if (currentLimit !== -1) {
      queryBuilder.skip((currentPage - 1) * currentLimit).take(currentLimit);
    }

    const [expenses, count] = await queryBuilder.getManyAndCount();

    const result = expenses.map((expense) => ExpenseTypeOrmRepository.toDomain(expense));

    const meta = StrictBuilder<GetAllMetaType>().page(currentPage).limit(currentLimit).total(count).build();

    return StrictBuilder<GetAllExpensesReturnType>().result(result).meta(meta).build();
  }

  async getByIdAndUserId({ id, userId }: { id: ExpenseId; userId: UserId }): Promise<IExpense | undefined> {
    const expense = await this.expenseModel.tx.getRepository(ExpenseEntity).findOne({
      where: {
        uuid: id,
        userId: userId,
      },
    });
    return expense ? ExpenseTypeOrmRepository.toDomain(expense) : undefined;
  }

  async updateByIdAndUserId({
    id,
    expense,
    userId,
  }: {
    id: ExpenseId;
    expense: UpdateExpenseCommand;
    userId: UserId;
  }): Promise<IExpense> {
    await this.expenseModel.tx.getRepository(ExpenseEntity).update({ uuid: id, userId: userId }, expense);
    const updatedExpense = await this.expenseModel.tx.getRepository(ExpenseEntity).findOne({
      where: {
        uuid: id,
        userId: userId,
      },
    });
    return ExpenseTypeOrmRepository.toDomain(updatedExpense as ExpenseEntity);
  }

  async getExpenseReport(query: GetExpenseReportQuery): Promise<ExpenseReportReturnType> {
    const { userId, startDate, endDate } = query;

    const queryBuilder = this.expenseModel.tx.getRepository(ExpenseEntity).createQueryBuilder('expense');

    // Filter by user
    queryBuilder.where('expense.userId = :userId', { userId });

    // Filter by date range if provided
    if (startDate) {
      queryBuilder.andWhere('expense.date >= :startDate', { startDate });
    }
    if (endDate) {
      queryBuilder.andWhere('expense.date <= :endDate', { endDate });
    }

    // Get total amount and count
    const totalResult = await queryBuilder
      .select('SUM(expense.amount)', 'totalAmount')
      .addSelect('COUNT(expense.uuid)', 'totalExpenses')
      .getRawOne();

    // Get expenses by category
    const categoryResults = await queryBuilder
      .select('expense.category', 'category')
      .addSelect('SUM(expense.amount)', 'total')
      .addSelect('COUNT(expense.uuid)', 'count')
      .groupBy('expense.category')
      .orderBy('total', 'DESC')
      .getRawMany();

    const categories: ExpensesByCategory[] = categoryResults.map((result) => ({
      category: result.category,
      total: parseFloat(result.total) || 0,
      count: parseInt(result.count) || 0,
    }));

    return {
      totalAmount: parseFloat(totalResult?.totalAmount) || 0,
      totalExpenses: parseInt(totalResult?.totalExpenses) || 0,
      categories,
      dateRange: {
        startDate,
        endDate,
      },
    };
  }

  public static toDomain(expenseEntity: ExpenseEntity): IExpense {
    return Builder(Expense)
      .uuid(expenseEntity.uuid)
      .title(expenseEntity.title)
      .amount(expenseEntity.amount)
      .date(expenseEntity.date)
      .category(expenseEntity.category)
      .notes(expenseEntity.notes)
      .userId(expenseEntity.userId)
      .createdAt(expenseEntity.createdAt)
      .updatedAt(expenseEntity.updatedAt)
      .build();
  }
}
