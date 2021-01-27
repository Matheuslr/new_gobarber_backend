import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import UploadConfig from '@config/upload';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExtis = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExtis) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    try {
      user.avatar = avatarFilename;

      await this.usersRepository.save(user);
    } catch {
      throw new AppError('Error on image upload');
    }

    return user;
  }
}

export default UpdateUserAvatarService;
