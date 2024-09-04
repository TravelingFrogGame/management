import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface InviteType {
  onsumeTotal: number;
  inviterName: string;
  inviterNo: string;
  level: number;
  userName: string;
  userNo: string;
  userRegisterTime: string;
}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<InviteType>>> {
  return request('/gm/invite/list', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function close(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<InviteType>>> {
  return request('/gm/invite/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
