import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import { mailConfig, transporter } from '@config/mail';
import 'dotenv/config';

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

export default class ZohoMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const { email, name } = mailConfig.default.from;

    const mailData = {
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: { address: to.email, name: to.name },
      subject,
      html: await mailTemplate.parse(templateData),
    };

    await transporter.sendMail(mailData);
  }
}
