import { GetLogsByEmailRequest } from 'src/auditLog/requests';
import { IpLabelLog, UserLog } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AuditLogService } from '../AuditLogService';

describe('AuditLogService', () => {
  let service: AuditLogService;
  let ipLogRepo: jest.Mocked<Repository<IpLabelLog>>;
  let userLogRepo: jest.Mocked<Repository<UserLog>>;
  let request: any;
  let response: any;

  beforeAll(() => {
    ipLogRepo = new Repository<IpLabelLog>(null, null, null) as jest.Mocked<
      Repository<IpLabelLog>
    >;
    userLogRepo = new Repository<UserLog>(null, null, null) as jest.Mocked<
      Repository<UserLog>
    >;
    service = new AuditLogService(ipLogRepo, userLogRepo);
  });
  describe('ping', () => {
    it('should return pong', () => {
      expect(service.ping()).toBe('pong');
    });
  });
});
