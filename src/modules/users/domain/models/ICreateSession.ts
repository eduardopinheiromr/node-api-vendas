import User from '@modules/users/infra/typeorm/entities/User';

export interface ICreateSessionRequest {
  email: string;
  password: string;
}

export interface ICreateSessionResponse {
  user: User;
  token: string;
}
