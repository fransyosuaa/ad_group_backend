import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
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
      return sendErrorResponse(409, 'That email already registered!');
    }
    const encryptedPassword = await bcrypt.hash(req.password, 10);
    req.password = encryptedPassword;
    const newUser = this.userRepository.create(req);
    await this.userRepository.save(newUser);
    const token = this.createToken(newUser.id, req.email);
    return sendSuccessResponse({ ...newUser, token });
  }

  async login(req: CreateUserRequest) {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user && (await bcrypt.compare(req.password, user.password))) {
      const token = this.createToken(user.id, req.email);
      return sendSuccessResponse({ ...user, token });
    }
    return sendErrorResponse(400, 'User not found!');
  }

  createToken(id, email) {
    const token = jwt.sign({ user_id: id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    return token;
  }
}
