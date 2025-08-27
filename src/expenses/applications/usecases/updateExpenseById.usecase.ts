import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { UserId } from 'src/users/applications/domains/user.domain';
import { type ExpenseId, type IExpense } from '../domains/expense.domain';
import type { ExpenseRepository, UpdateExpenseCommand } from '../ports/expense.repository';
import { expenseRepositoryToken } from '../ports/expense.repository';

@Injectable()
export class UpdateExpenseByIdUseCase {
  constructor(
    @Inject(expenseRepositoryToken)
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute({
    id,
    expense,
    userId,
  }: {
    id: ExpenseId;
    expense: UpdateExpenseCommand;
    userId: UserId;
  }): Promise<IExpense> {
    const existingExpense = await this.expenseRepository.getByIdAndUserId({ id, userId });
    if (!existingExpense) {
      throw new NotFoundException('Expense not found');
    }

    return this.expenseRepository.updateByIdAndUserId({ id, expense, userId });
  }
}
