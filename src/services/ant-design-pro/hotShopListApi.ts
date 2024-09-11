
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface HotShopAddType {
  detail: any;
  detailsUrl: string;
  endTime: string;
  id: number;
  maxSupply: number;
  maxSupply2: number;
  name: string;
  price: number;
  startTime: string;
}

export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<HotShopAddType>>> {
  return request('/api/gm/shop/hotShopList', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function add(
  body: { assetId: number; assetConfigId: number; probability: number;},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<HotShopAddType>>> {
  return request('/api/gm/shop/hotShopAdd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function update(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<HotShopAddType>>> {
  return request('/api/gm/shop/hotShopUpdate', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(
  body: {
    id: number;
  },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<HotShopAddType>>> {
  return request('/api/gm/shop/hotShopDelete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
