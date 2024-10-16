

import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface RobotType {
  account: string;
  coin: string;
  createTime: string;
  creatorName: string;
  frog: string;
  id: number;
  name: string;
  production: string;
  seed: string;
  travel: string;
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
    data: body,
    ...(options || {}),
  });

  // return request('/api/gm/robot/create', {
  //   method: 'POST',
  //   body: body,
  //   ...(options || {}),
  // });
}
export async function travel(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/travel', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function product(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/product', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function hotShopList(
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/hotShopList', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function frogLevelUp(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/frogLevelUp', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function courtyardLevelUp(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/courtyardLevelUp', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function buyHotShop(
  body: any,
  options?: { [p: string]: any },
): Promise<any> {
  return request('/api/gm/robot/buyHotShop', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
