import { Paging, ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export interface AnnouncementType {
  content: string;
  createTime: number;
  id: number;
  publishTime: string;
  status: number;
  title: string;
  url: string;
  remark: string;
}

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/api/gm/notice/list', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}
export async function close(
  body: { id: number },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/api/gm/notice/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function add(
  body: AnnouncementType,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/api/gm/notice/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function update(
  body: AnnouncementType,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<AnnouncementType>>> {
  return request('/api/gm/notice/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
