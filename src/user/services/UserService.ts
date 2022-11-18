import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserRequest } from '../requests';
import { User } from '../entities';
import { mapLoginResponse, sendSuccessResponse } from 'src/utils';
import { LoginResponse } from '../response/LoginResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  ping(): string {
    return 'pong';
  }

  async register(req: CreateUserRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user) {
      throw new HttpException(
        'That email already registered!',
        HttpStatus.CONFLICT,
      );
    }
    req.password = await bcrypt.hash(req.password, 10);
    const newUser = this.userRepository.create(req);
    await this.userRepository.save(newUser);
    const token = this.createToken(newUser.id, req.email);
    const result = mapLoginResponse(newUser);
    return sendSuccessResponse({ ...result, token });
  }

  async login(req: CreateUserRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user && (await bcrypt.compare(req.password, user.password))) {
      const token = this.createToken(user.id, req.email);
      const result = mapLoginResponse(user);
      return sendSuccessResponse({ ...result, token });
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  createToken(id, email) {
    const token = jwt.sign({ user_id: id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    return token;
  }
}
