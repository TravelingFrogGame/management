import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface AnnouncementType {
  content: string;
  createTime: number;
  id: number;
  publishTime: number;
  status: number;
  title: string;
  url: string;
}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/gm/notice/list', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}
export async function close(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/gm/notice/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
