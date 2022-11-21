import {
  CreateIpLabel,
  GetIPLabelsPaginationRequest,
  UpdateIpLabel,
} from 'src/ipLabel/requests/IpLabelRequests';
import { IpLabelService } from 'src/ipLabel/services';
import { IpLabelController } from '../IpLabelController';

describe('IpLabelController', () => {
  let controller: IpLabelController;
  let service: IpLabelService;
  let payload: any;

  beforeAll(() => {
    service = new IpLabelService(null, null);
    controller = new IpLabelController(service);
  });

  describe('ping', () => {
    it('should call service.ping', () => {
      service.ping = jest.fn();
      controller.ping();
      expect(service.ping).toHaveBeenCalled();
    });
  });
  describe('getIpLabels', () => {
    it('should call service.getIpLabels', async () => {
      const query = new GetIPLabelsPaginationRequest();
      service.getIpLabels = jest.fn();
      await controller.getIpLabels(query);
      expect(service.getIpLabels).toHaveBeenCalled();
    });
  });
  describe('getIpLabelById', () => {
    it('should call service.getIpLabelById', async () => {
      service.getIpLabelById = jest.fn();
      await controller.getIpLabelById('id');
      expect(service.getIpLabelById).toHaveBeenCalled();
    });
  });
  describe('create', () => {
    it('should call service.create', async () => {
      payload = new CreateIpLabel();
      service.create = jest.fn();
      await controller.create(payload);
      expect(service.create).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should call service.update', async () => {
      payload = new UpdateIpLabel();
      service.update = jest.fn();
      await controller.update(payload);
      expect(service.update).toHaveBeenCalled();
    });
  });
});
