
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface LotteryType {
  id: number;
  name: string;
  probability: string;
  type: string;
}

export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<LotteryType>>> {
  return request('/api/gm/lottery/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function add(
  body: { assetId: number; assetConfigId: number; probability: number;},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<LotteryType>>> {
  return request('/api/gm/lottery/add', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function update(
  body: {
    id: number;
    probability: number;
  },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<LotteryType>>> {
  return request('/api/gm/lottery/update', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function remove(
  body: {
    id: number;
  },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<LotteryType>>> {
  return request('/api/gm/lottery/delete', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
