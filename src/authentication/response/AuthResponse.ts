import { UserType } from '../enums';

export interface LoginResponse {
  data: {
    type: UserType;
    email: string;
    token: string;
  };
}

export interface LogoutResponse {
  data: {
    type: UserType;
    email: string;
    token: string;
  };
}
