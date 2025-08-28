import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { Injectable } from '@nestjs/common';
import { Builder, StrictBuilder } from 'builder-pattern';
import { GetAllMetaType } from 'src/types/utility.type';
import { UserId } from 'src/users/applications/domains/user.domain';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseAmount, ExpenseId, IExpense } from '../../applications/domains/expense.domain';
import {
  ExpenseReportReturnType,
  ExpenseRepository,
  ExpensesByCategory,
  GetAllExpensesQuery,
  GetAllExpensesReturnType,
  GetExpenseReportQuery,
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

  async updateByIdAndUserId(expense: IExpense): Promise<IExpense> {
    await this.expenseModel.tx
      .getRepository(ExpenseEntity)
      .update({ uuid: expense.uuid, userId: expense.userId }, expense);

    const updatedExpense = await this.expenseModel.tx.getRepository(ExpenseEntity).findOne({
      where: {
        uuid: expense.uuid,
        userId: expense.userId,
      },
    });
    return ExpenseTypeOrmRepository.toDomain(updatedExpense!);
  }

  async getExpenseReport(query: GetExpenseReportQuery): Promise<ExpenseReportReturnType> {
    const { userId, startDate, endDate } = query;

    const baseQB = this.expenseModel.tx.getRepository(ExpenseEntity).createQueryBuilder('expense');

    // Filter
    baseQB.where('expense.userId = :userId', { userId });
    if (startDate) baseQB.andWhere('expense.date >= :startDate', { startDate });
    if (endDate) baseQB.andWhere('expense.date <= :endDate', { endDate });

    // --- Total summary ---
    const totalQB = baseQB.clone();
    const totalResult = await totalQB
      .select('SUM(expense.amount)', 'totalAmount')
      .addSelect('COUNT(expense.uuid)', 'totalExpenses')
      .getRawOne();

    // --- Category summary ---
    const categoryQB = baseQB.clone();
    const categoryResults = await categoryQB
      .select('expense.category', 'category')
      .addSelect('SUM(expense.amount)', 'total')
      .addSelect('COUNT(expense.uuid)', 'count')
      .groupBy('expense.category')
      .orderBy('total', 'DESC')
      .getRawMany();

    const categories: ExpensesByCategory[] = categoryResults.map((result) => ({
      category: result.category,
      total: Number(result.total) || 0,
      count: parseInt(result.count) || 0,
    }));

    return {
      totalAmount: Number(totalResult?.totalAmount) || 0,
      totalExpenses: parseInt(totalResult?.totalExpenses) || 0,
      categories,
      dateRange: { startDate, endDate },
    };
  }

  public static toDomain(expenseEntity: ExpenseEntity): IExpense {
    const amount = Number(expenseEntity.amount.toString()) as ExpenseAmount;
    return Builder(Expense)
      .uuid(expenseEntity.uuid)
      .title(expenseEntity.title)
      .amount(amount)
      .date(expenseEntity.date)
      .category(expenseEntity.category)
      .notes(expenseEntity.notes)
      .userId(expenseEntity.userId)
      .createdAt(expenseEntity.createdAt)
      .updatedAt(expenseEntity.updatedAt)
      .build();
  }
}
