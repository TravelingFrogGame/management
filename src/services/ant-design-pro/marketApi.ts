
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface MarketType {
  buyAssetId: number;
  buyName: string;
  id: number;
  sellAssetConfigId: number;
  sellAssetId: number;
  sellName: string;
  sellType: string;
}

export async function add(
  body: {
    sellAssetId: number,
    sellAssetConfigId: number,
    buyAssetId: number,
  },
  options?: { [p: string]: any },
): Promise<ResultType<any>> {
  return request('/api/gm/market/add', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function update(
  body: {
    sellAssetId: number,
    sellAssetConfigId: number,
    buyAssetId: number,
  },
  options?: { [p: string]: any },
): Promise<ResultType<any>> {
  return request('/api/gm/market/update', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function remove(
  body: {
    id: number,
  },
  options?: { [p: string]: any },
): Promise<ResultType<any>> {
  return request('/api/gm/market/delete', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<MarketType>>> {
  return request('/api/gm/market/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
