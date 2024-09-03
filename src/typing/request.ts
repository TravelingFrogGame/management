export enum ResultCode {
  'Success' = 1,
  'T101' = 101,
  'T201' = 201,
  'T301' = 301,
  'T401' = 401,
  'T402' = 402,
  'UserNotFound' = -1101,
  'InvalidToken' = -1105,
  'MarketOrderNotMatch' = -1602,
  'MarketOrderCoinNotEnough' = -1603,
}

export enum PostMethod {
  GET = 'get',
  POST = 'post',
  POST_FORM = 'postForm',
  POST_JSON = 'postJson',
}

export interface RequestParameter {
  method?: PostMethod;
  url: string;
  data?: any;
  headers?: any;
  timeout?: number;
  retry?: number;
  release?: boolean | null | undefined;
  fullUrl?: boolean;
}

export interface ResultType<T> {
  code: ResultCode;
  data: T;
  msg: string;
  success: boolean;
  error: boolean;
}


export interface Paging<T> {
  last?: boolean;
  list?: T[];
  page?: number;
  total?: number;
  totalPage?: number;
}
