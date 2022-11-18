import { User } from './typeorm';

export const mapLoginResponse = (data: User) => ({
  data: {
    email: data.email,
    type: data.type,
    token: data.token,
  },
});
