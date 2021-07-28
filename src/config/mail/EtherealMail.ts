import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const {
      smtp: { host, port, secure },
      user,
      pass,
    } = account;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const mailTemplate = new HandlebarsMailTemplate();

    await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name || 'Equipe API Vendas',
        address: to.email || 'equipe@apivendas.com.br',
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
