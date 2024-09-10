
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';
import {AssetConfigCombo} from "@/services/ant-design-pro/assetApi";

export interface InviteType {

}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<InviteType>>> {
  return request('/api/gm/invite/list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function close(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<InviteType>>> {
  return request('/api/gm/invite/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function csv(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<InviteType>>> {
  return request('/api/gm/invite/csv', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function add(
  body: { assetId: number, type: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AssetConfigCombo>>> {
  return request('/api/gm/asset/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
