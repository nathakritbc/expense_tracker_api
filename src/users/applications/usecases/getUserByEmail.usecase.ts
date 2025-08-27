import { Inject, Injectable } from '@nestjs/common';

import { IUser } from '../domains/user.domain';
import type { UserRepository } from '../ports/user.repository';
import { userRepositoryToken } from '../ports/user.repository';

export type GetUserByEmailQuery = Pick<IUser, 'email'>;

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(userRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<IUser | undefined> {
    const user = await this.userRepository.getByEmail(query.email);
    if (!user) return undefined;
    user.hiddenPassword();
    return user;
  }
}
