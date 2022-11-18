import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  mapIpLabelResponse,
  sendSuccessPaginationResponse,
} from 'src/common/utils';
import { Repository } from 'typeorm';
import { IpLabel, IpLabelLog } from '../entities';
import {
  CreateIpLabel,
  CreateIpLabelLogRequest,
  GetIPLabelsPaginationRequest,
  UpdateIpLabel,
} from '../requests/IpLabelRequests';
import { IpLabelResponse } from '../response/IpLabelResponse';

@Injectable()
export class IpLabelService {
  constructor(
    @InjectRepository(IpLabel)
    private readonly ipRepo: Repository<IpLabel>,
    @InjectRepository(IpLabelLog)
    private readonly ipLogRepo: Repository<IpLabelLog>,
  ) {}
  ping(): string {
    return 'pong';
  }

  async create(req: CreateIpLabel): Promise<IpLabelResponse> {
    const ipLabel: IpLabel = await this.ipRepo.findOne({
      where: {
        ipAddress: req.ipAddress,
      },
    });
    if (ipLabel) {
      throw new HttpException(
        'IP Address already exists!!',
        HttpStatus.CONFLICT,
      );
    }
    const newIpLabel: IpLabel = new IpLabel();
    newIpLabel.ipAddress = req.ipAddress;
    newIpLabel.label = req.label;
    await this.ipRepo.save(newIpLabel);

    const addLog = new CreateIpLabelLogRequest();
    addLog.createdBy = req.email;
    addLog.oldLabel = '';
    addLog.newLabel = req.label;
    addLog.ipAddress = req.ipAddress;

    this.createLog(addLog);

    return mapIpLabelResponse(newIpLabel);
  }

  async update(req: UpdateIpLabel): Promise<IpLabelResponse> {
    const ipLabel: IpLabel = await this.ipRepo.findOne({
      where: {
        ipAddress: req.ipAddress,
      },
    });
    if (!ipLabel) {
      throw new HttpException('IP Address is not found!', HttpStatus.NOT_FOUND);
    }
    const addLog = new CreateIpLabelLogRequest();
    addLog.createdBy = req.email;
    addLog.oldLabel = ipLabel.label;
    addLog.newLabel = req.label;
    addLog.ipAddress = req.ipAddress;
    this.createLog(addLog);

    ipLabel.label = req.label;
    await this.ipRepo.upsert(ipLabel, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    });

    return mapIpLabelResponse(ipLabel);
  }

  createLog(req: CreateIpLabelLogRequest) {
    const newLog = new IpLabelLog();
    newLog.ipAddress = req.ipAddress;
    newLog.oldLabel = req.oldLabel;
    newLog.newLabel = req.newLabel;
    newLog.createdBy = req.createdBy;

    this.ipLogRepo.save(newLog);
  }

  async getIpLabels(
    request: GetIPLabelsPaginationRequest,
  ): Promise<SuccessPaginationResponse> {
    const { ipAddress, label, page, perPage } = request;
    const paginationReq = new PaginationRequest();
    paginationReq.page = parseInt(page, 10);
    paginationReq.perPage = parseInt(perPage, 10);

    const { queryStrings, queryParams } = this.buildStringParams(
      ipAddress,
      label,
    );
    const [userLogs, count]: [IpLabel[], number] = await this.ipRepo
      .createQueryBuilder('ip')
      .where(queryStrings, queryParams)
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

  async getIpLabelById(id: string): Promise<IpLabelResponse> {
    const ipLabel: IpLabel = await this.ipRepo.findOne({
      where: {
        id,
      },
    });
    return mapIpLabelResponse(ipLabel);
  }

  private buildStringParams(ipAddress: string, label: string): QueryFilter {
    let queryStrings = '1 = 1';
    const queryParams = {};
    if (ipAddress) {
      queryStrings = `${queryStrings} and ip.ipAddress = :ipAddress`;
      setWith(queryParams, 'ipAddress', ipAddress);
    }
    if (label) {
      queryStrings = `${queryStrings} and ip.label LIKE :label`;
      setWith(queryParams, 'label', `%${label}%`);
    }
    return { queryStrings, queryParams };
  }
}
