import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProvider/implementatiosn/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
