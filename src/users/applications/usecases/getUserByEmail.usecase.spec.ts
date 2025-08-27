import { faker } from '@faker-js/faker';
import { StrictBuilder } from 'builder-pattern';
import { mock } from 'vitest-mock-extended';
import { IUser, UserEmail } from '../domains/user.domain';
import { UserRepository } from '../ports/user.repository';
import { GetUserByEmailQuery, GetUserByEmailUseCase } from './getUserByEmail.usecase';

describe('Get User By Username Use Case', () => {
  let useCase: GetUserByEmailUseCase;
  const userRepository = mock<UserRepository>();

  beforeEach(() => {
    useCase = new GetUserByEmailUseCase(userRepository);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be return undefined when user is not exist.', async () => {
    // Arrange
    const email = faker.internet.email() as UserEmail;
    userRepository.getByEmail.mockResolvedValue(undefined);

    const query = StrictBuilder<GetUserByEmailQuery>().email(email).build();

    // Act
    const actual = await useCase.execute(query);

    // Assert
    expect(actual).toBeUndefined();
    expect(userRepository.getByEmail).toHaveBeenCalledWith(email);
  });

  it('should be get user by username when user is exist.', async () => {
    // Arrange
    const email = faker.internet.email() as UserEmail;
    const user = mock<IUser>({
      email,
    });

    userRepository.getByEmail.mockResolvedValue(user);

    const query = StrictBuilder<GetUserByEmailQuery>().email(email).build();

    const expected = user;

    // Act
    const actual = await useCase.execute(query);

    // Assert
    expect(actual).toEqual(expected);
    expect(userRepository.getByEmail).toHaveBeenCalledWith(email);
  });
});
