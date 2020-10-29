import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';

import AppError from '../errors/AppError';
import User from '../models/User';
import UploadConfig from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

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

      await userRepository.save(user);
    } catch {
      throw new AppError('Error on image upload');
    }

    return user;
  }
}

export default UpdateUserAvatarService;
