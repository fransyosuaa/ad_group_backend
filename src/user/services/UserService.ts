import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '../requests';
import { User } from '../entities';
import { sendErrorResponse, sendSuccessResponse } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  ping(): string {
    return 'pong';
  }

  async register(req: CreateUserRequest) {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user) {
      return sendErrorResponse(400, 'That email already registered!');
    }
    const newUser = this.userRepository.create(req);
    await this.userRepository.save(newUser);
    return sendSuccessResponse(newUser);
  }

  async login(req: CreateUserRequest) {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
        password: req.password,
      },
    });
    if (!user) {
      return sendErrorResponse(400, 'User not found!');
    }
    return sendSuccessResponse(user);
  }
}
