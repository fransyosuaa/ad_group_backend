import { PaginationRequest } from '../requests/PaginationRequest';
import { IpLabel, User } from '../../typeorm';
import { PaginationDataResponse, SuccessPaginationResponse } from '../response';

export const mapLoginResponse = (data: User) => ({
  data: {
    email: data.email,
    type: data.type,
    token: data.token,
  },
});

export const mapIpLabelResponse = (data: IpLabel) => ({
  data: {
    ipAddress: data.ipAddress,
    label: data.label,
  },
});

export const getLimit = (paginationData: PaginationRequest): number => {
  return paginationData.perPage || 25;
};

export const getOffset = (paginationData: PaginationRequest): number => {
  const page = paginationData.page || 1;
  return getLimit(paginationData) * (page - 1);
};

export const sendSuccessPaginationResponse = (
  dt: PaginationDataResponse,
): SuccessPaginationResponse => {
  const { data, page, perPage, totalItems } = dt;
  const totalPages = Math.max(Math.ceil(totalItems / perPage), 1);
  return {
    data,
    meta: {
      page,
      perPage,
      totalItems,
      totalPages,
    },
  };
};
