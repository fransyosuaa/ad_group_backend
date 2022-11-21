export interface PaginationDataResponse {
  data: any;
  page: number;
  perPage: number;
  totalItems: number;
}

export interface QueryFilter {
  queryStrings: string;
  queryParams: object;
}

export interface SuccessPaginationResponse {
  data: any;
  meta: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}
