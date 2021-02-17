import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/mailProvider/dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
