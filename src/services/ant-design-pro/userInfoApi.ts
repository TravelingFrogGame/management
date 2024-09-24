
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface UserInfo {
  creator: number;
  id: number;
  loginIp: string;
  name: string;
}


export async function list(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<UserInfo>>> {
  return request('/api/gm/info/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function updateMenu(
  body: {gmId: number, menu: string},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<UserInfo>>> {
  return request('/api/gm/info/updateMenu', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function create(
  body: UserInfo,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<UserInfo>>> {
  return request('/api/gm/info/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
