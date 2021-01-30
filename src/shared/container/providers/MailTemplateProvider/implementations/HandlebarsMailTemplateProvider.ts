import handlebars from 'handlebars';
import fs from 'fs';
import IParserMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParserMailTemplateDTO): Promise<string> {
    const templateFileContet = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContet);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
