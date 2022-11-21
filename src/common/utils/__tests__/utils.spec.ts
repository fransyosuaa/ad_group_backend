import { PaginationRequest } from 'src/common/requests/PaginationRequest';
import { PaginationDataResponse } from 'src/common/response';
import { IpLabel, User } from 'src/typeorm';
import {
  mapLoginResponse,
  mapIpLabelResponse,
  getLimit,
  getOffset,
  sendSuccessPaginationResponse,
} from '../';
describe('utils', () => {
  let paginationData: PaginationRequest;
  beforeAll(() => {
    paginationData = new PaginationRequest();
    paginationData.page = 1;
    paginationData.perPage = 10;
  });
  describe('mapLoginResponse', () => {
    it('should return an expected object', () => {
      const data = new User();
      const resp = mapLoginResponse(data);
      expect(resp).toStrictEqual({
        data: {
          email: data.email,
          type: data.type,
          token: data.token,
        },
      });
    });
  });
  describe('mapIpLabelResponse', () => {
    it('should return an expected object', () => {
      const data = new IpLabel();
      const resp = mapIpLabelResponse(data);
      expect(resp).toStrictEqual({
        data: {
          ipAddress: data.ipAddress,
          label: data.label,
        },
      });
    });
  });
  describe('getLimit', () => {
    it('should return an expected value', () => {
      const resp = getLimit(paginationData);
      expect(resp).toBe(10);
    });
  });
  describe('getOffset', () => {
    it('should return an expected value', () => {
      const resp = getOffset(paginationData);
      expect(resp).toBe(0);
    });
  });
  describe('sendSuccessPaginationResponse', () => {
    it('should return an expected value', () => {
      const dt: PaginationDataResponse = {
        data: [1, 2, 3],
        page: 1,
        perPage: 10,
        totalItems: 3,
      };
      const resp = sendSuccessPaginationResponse(dt);
      expect(resp).toStrictEqual({
        data: dt.data,
        meta: {
          page: dt.page,
          perPage: dt.perPage,
          totalItems: dt.totalItems,
          totalPages: Math.max(Math.ceil(dt.totalItems / dt.perPage), 1),
        },
      });
    });
  });
});
