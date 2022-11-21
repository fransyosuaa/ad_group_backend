import { GetIpLogsById, GetLogsByEmailRequest } from 'src/auditLog/requests';
import { AuditLogService } from 'src/auditLog/services';
import { AuditLogController } from '../AuditLogController';

describe('AuditLogController', () => {
  let controller: AuditLogController;
  let service: AuditLogService;

  beforeAll(() => {
    service = new AuditLogService(null, null);
    controller = new AuditLogController(service);
  });

  describe('ping', () => {
    it('should call service.ping', () => {
      service.ping = jest.fn();
      controller.ping();
      expect(service.ping).toHaveBeenCalled();
    });
  });
  describe('getUserLogs', () => {
    it('should call service.getUserLogs', async () => {
      const query = new GetLogsByEmailRequest();
      service.getUserLogs = jest.fn();
      await controller.getUserLogs(query);
      expect(service.getUserLogs).toHaveBeenCalled();
    });
  });
  describe('getIpLabelLogs', () => {
    it('should call service.getIpLabelLogs', async () => {
      const query = new GetIpLogsById();
      service.getIpLabelLogs = jest.fn();
      await controller.getIpLabelLogs(query);
      expect(service.getIpLabelLogs).toHaveBeenCalled();
    });
  });
});
