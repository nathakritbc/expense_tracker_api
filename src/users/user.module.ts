import { Module } from '@nestjs/common';
import { UserTypeOrmRepository } from './adapters/outbounds/user.typeorm.repository';
import { userRepositoryToken } from './applications/ports/user.repository';
import { CreateUserUseCase } from './applications/usecases/createUser.usecase';
import { GetUserByEmailUseCase } from './applications/usecases/getUserByEmail.usecase';

@Module({
  providers: [
    {
      provide: userRepositoryToken,
      useClass: UserTypeOrmRepository,
    },
    CreateUserUseCase,
    GetUserByEmailUseCase,
  ],
})
export class UserModule {}
