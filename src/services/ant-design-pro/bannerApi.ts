import { ResultType } from '@/typing/request';
import { request } from '@umijs/max';

export async function list(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<{ gToken: string }>> {
  return request('/gm/banner/list', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}
