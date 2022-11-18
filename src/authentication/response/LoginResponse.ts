import { UserType } from '../enums';

export interface LoginResponse {
  data: {
    type: UserType;
    email: string;
    token: string;
  };
}
