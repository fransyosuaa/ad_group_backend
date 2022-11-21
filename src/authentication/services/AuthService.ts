import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserRequest } from '../requests';
import { User, UserLog } from '../entities';
import { mapLoginResponse } from '../../common/utils';
import { LoginResponse, LogoutResponse } from '../response/AuthResponse';
import { CreateUserLogRequest, LogoutRequest } from '../requests/UserRequests';
import { ActionLogType, UserType } from '../enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserLog)
    private readonly userLogRepo: Repository<UserLog>,
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
    const userEntity = new User();
    userEntity.email = req.email;
    userEntity.password = await bcrypt.hash(req.password, 10);
    userEntity.token = this.createToken(userEntity.id, req.email);
    if (req.type) {
      userEntity.type = req.type;
    }
    await this.userRepository.save(userEntity);
    this.createLog({ email: req.email, action: ActionLogType.REGIST });

    return mapLoginResponse(userEntity);
  }

  async login(req: CreateUserRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user && (await bcrypt.compare(req.password, user.password))) {
      user.token = this.createToken(user.id, req.email);
      await this.userRepository.upsert(user, {
        conflictPaths: ['id'],
        skipUpdateIfNoValuesChanged: true,
      });
      this.createLog({ email: req.email, action: ActionLogType.LOGIN });
      return mapLoginResponse(user);
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  async logout(req: LogoutRequest): Promise<LogoutResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (user) {
      user.token = '';
      await this.userRepository.save(user);
      this.createLog({ email: req.email, action: ActionLogType.LOGOUT });
      return mapLoginResponse(user);
    }
    throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
  }

  private createToken(id, email): string {
    const token = jwt.sign({ user_id: id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    return token;
  }

  createLog(req: CreateUserLogRequest): void {
    const newLog = new UserLog();
    newLog.email = req.email;
    newLog.action = req.action;
    this.userLogRepo.save(newLog);
  }
}
