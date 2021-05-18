import fs from 'fs';
import path from 'path';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const isUploadCreated = await !!fs.promises.access(
      path.resolve(uploadConfig.uploadsFolder),
    );

    if (!isUploadCreated) {
      fs.promises.mkdir(`${uploadConfig.uploadsFolder}`);
    }

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
