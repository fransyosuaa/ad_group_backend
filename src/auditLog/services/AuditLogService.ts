import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationRequest } from 'src/common/requests/PaginationRequest';
import {
  PaginationDataResponse,
  SuccessPaginationResponse,
} from 'src/common/response';
import {
  getLimit,
  getOffset,
  sendSuccessPaginationResponse,
} from 'src/common/utils';
import { UserLog } from 'src/typeorm';
import { Repository } from 'typeorm';
import { GetLogsByEmailRequest } from '../requests';

@Injectable()
export class AuditLogService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    @InjectRepository(UserLog)
    private readonly userLogRepo: Repository<UserLog>,
  ) {}
  ping(): string {
    return 'pong';
  }

  async getUserLogs(
    request: GetLogsByEmailRequest,
  ): Promise<SuccessPaginationResponse> {
    const { email, page, perPage } = request;
    const paginationReq = new PaginationRequest();
    paginationReq.page = parseInt(page, 10);
    paginationReq.perPage = parseInt(perPage, 10);

    const queryParams = {
      email,
    };
    const [userLogs, count]: [UserLog[], number] = await this.userLogRepo
      .createQueryBuilder('userLog')
      .where('userLog.email = :email', queryParams)
      .addOrderBy('userLog.createdAt', 'DESC')
      .skip(getOffset(paginationReq))
      .take(getLimit(paginationReq))
      .getManyAndCount();
    const successData: PaginationDataResponse = {
      data: userLogs,
      page: paginationReq.page,
      perPage: paginationReq.perPage,
      totalItems: count,
    };
    return sendSuccessPaginationResponse(successData);
  }
}
