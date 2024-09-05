
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface AssetType {
  description: string;
  hasConfig: boolean;
  id: number;
  maxLevel: number;
  name: string;
  nft: boolean;
}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetType>>> {
  return request('/gm/asset/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function configList(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetType>>> {
  return request('/gm/asset/configList', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
