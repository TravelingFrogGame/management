
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface ShopType {
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

export interface ShopConf {
  description: string;
  hasConfig: boolean;
  id: number;
  image: string;
  maxLevel: number;
  name: string;
  nft: boolean;
  present: boolean;
}

export async function shopList(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<ShopType>>> {
  return request('/api/gm/shop/shopList', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function shopAdd(
  body: { costPriceType: any; assetId: any; originPrice: any; assetConfigId: any },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<ShopType>>> {
  return request('/api/gm/shop/shopAdd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function shopUpdate(
  body: {
    shopId: number;
    originPrice: number;
    costPriceType: number;
  },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<ShopType>>> {
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
): Promise<ResultType<Paging<ShopType>>> {
  return request('/api/gm/shop/shopDelete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
