import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProvider/implementatiosn/DiskStorageProvider';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
// import MailProvider from '@shared/container/providers/mailProvider/implementations/';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);
