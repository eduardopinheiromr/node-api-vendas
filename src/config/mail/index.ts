import nodemailer from 'nodemailer';
import 'dotenv/config';

interface IMailConfig {
  driver: 'ethereal' | 'zoho' | string;
  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mailConfig: IMailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  default: {
    from: {
      email: process.env.MAIL_FROM as string,
      name: process.env.MAIL_NAME as string,
    },
  },
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});

export { mailConfig, transporter };
