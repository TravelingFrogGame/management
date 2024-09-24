
import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface UserInfo {
  account: number;
  creator: number;
  menu: string;
  id: number;
  gmId: number;
  name: string;
  remark: string;
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
export async function update(
  body: {gmId: number, menu: string},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<UserInfo>>> {
  return request('/api/gm/info/update', {
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

export async function remove(
  body: any,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<UserInfo>>> {
  return request('/api/gm/info/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
