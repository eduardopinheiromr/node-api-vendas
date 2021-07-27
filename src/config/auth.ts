import { config } from 'dotenv';
config();

export default {
  jwt: {
    secret: process.env.JWT_TOKEN as string,
    expiresIn: process.env.EXPIRES_IN as string,
  },
};
