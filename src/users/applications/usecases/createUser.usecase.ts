import { Inject, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';

import { OmitFunctions } from 'src/utils/function.util';
import { IUser, User, UserPassword } from '../domains/user.domain';
import type { UserRepository } from '../ports/user.repository';
import { userRepositoryToken } from '../ports/user.repository';

export interface CreateUserCommand extends OmitFunctions<Omit<IUser, 'password'>> {
  password: UserPassword;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(userRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ email, password }: CreateUserCommand): Promise<IUser> {
    const user = Builder(User).email(email).build();
    await user.setHashPassword(password);

    const createdUser = await this.userRepository.create(user);
    createdUser.hiddenPassword();
    return createdUser;
  }
}
