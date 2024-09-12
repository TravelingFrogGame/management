
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface AssetType {
  description: string;
  hasConfig: boolean;
  id: number;
  maxLevel: number;
  name: string;
  nft: boolean;
  image: string;
}

export interface AssetConfigCombo {
  assetId: number;
  assetConfigId: number;
  level: number;
  name: string;
}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetType>>> {
  return request('/api/gm/asset/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function configList(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetType>>> {
  return request('/api/gm/asset/configList', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function assetConfigComboBox(
  body: { assetId: number, type: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetConfigCombo>>> {
  console.log(body, '===')
  return request('/api/gm/asset/assetConfigComboBox', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


