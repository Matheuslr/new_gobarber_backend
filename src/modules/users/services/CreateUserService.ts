import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;