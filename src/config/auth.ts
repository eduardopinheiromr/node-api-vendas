import 'dotenv/config';

const authConfig = {
  jwt: {
    secret: process.env.JWT_TOKEN as string,
    expiresIn: process.env.EXPIRES_IN as string,
  },
};

export default authConfig;
