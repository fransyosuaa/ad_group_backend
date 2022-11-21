import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { setWith } from 'lodash';
import { PaginationRequest } from 'src/common/requests/PaginationRequest';
import {
  PaginationDataResponse,
  QueryFilter,
  SuccessPaginationResponse,
} from 'src/common/response';
import {
  getLimit,
  getOffset,
  sendSuccessPaginationResponse,
} from 'src/common/utils';
import { IpLabelLog, UserLog } from 'src/typeorm';
import { Repository } from 'typeorm';
import { GetIpLogsById, GetLogsByEmailRequest } from '../requests';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(IpLabelLog)
    private readonly ipLabelLogRepo: Repository<IpLabelLog>,
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

    const { queryStrings, queryParams } = this.buildStringParams(email);

    const [userLogs, count]: [UserLog[], number] = await this.userLogRepo
      .createQueryBuilder('userLog')
      .where(queryStrings, queryParams)
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

  async getIpLabelLogs(
    request: GetIpLogsById,
  ): Promise<SuccessPaginationResponse> {
    const { id, page, perPage } = request;
    const paginationReq = new PaginationRequest();
    paginationReq.page = parseInt(page, 10);
    paginationReq.perPage = parseInt(perPage, 10);

    const queryParams = {
      id,
    };
    const [ipLabelLogs, count]: [IpLabelLog[], number] =
      await this.ipLabelLogRepo
        .createQueryBuilder('ipLog')
        .where('ipLog.ipLabelId = :id', queryParams)
        .addOrderBy('ipLog.createdAt', 'DESC')
        .skip(getOffset(paginationReq))
        .take(getLimit(paginationReq))
        .getManyAndCount();
    const successData: PaginationDataResponse = {
      data: ipLabelLogs,
      page: paginationReq.page,
      perPage: paginationReq.perPage,
      totalItems: count,
    };
    return sendSuccessPaginationResponse(successData);
  }

  private buildStringParams(email: string): QueryFilter {
    let queryStrings = '1 = 1';
    const queryParams = {};
    if (email) {
      queryStrings = `${queryStrings} and userLog.email = :email`;
      setWith(queryParams, 'email', email);
    }
    return { queryStrings, queryParams };
  }
}
