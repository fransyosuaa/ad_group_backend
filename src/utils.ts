import { User } from './typeorm';

export const sendSuccessResponse = (data) => ({ data });

export const mapLoginResponse = (data: User) => ({
  email: data.email,
  type: data.type,
});
