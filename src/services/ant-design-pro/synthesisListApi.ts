
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface SynthesisType {
  costPriceType: number;
  description: string;
  detailsUrl: string;
  image: string;
  name: string;
  originPrice: number;
  shopId: number;
  type: number;
  typeName: string;
}

export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/synthesisList', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function synthesisAdd(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/synthesisAdd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function synthesisUpdate(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/synthesisUpdate', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function synthesisDelete(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/synthesisDelete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function add(
  body: { assetId: number; assetConfigId: number; probability: number;},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/hotShopAdd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function update(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/shopUpdate', {
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
): Promise<ResultType<Paging<SynthesisType>>> {
  return request('/api/gm/shop/hotShopDelete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
