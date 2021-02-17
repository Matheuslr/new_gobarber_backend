import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/storageProvider/implementatiosn/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/mailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
