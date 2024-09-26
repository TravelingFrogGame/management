

import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface RobotType {
  buyAssetId: number;
  buyName: string;
  id: number;
  sellAssetConfigId: number;
  sellAssetId: number;
  sellName: string;
  sellType: string;
}

export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<RobotType>>> {
  return request('/api/gm/robot/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function create(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/create', {
    method: 'POST',
    body: body,
    ...(options || {}),
  });
}
