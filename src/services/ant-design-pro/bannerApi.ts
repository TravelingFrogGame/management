import {Paging, ResultType} from '@/typing/request';
import { request } from '@umijs/max';

export interface BannerItem {
  url?: string;
  image?: string;
  id?: number;
  createTime?: string;
  publishTime?: string;
  creator?: string;
  status?: number; // 1发布成功 2预发布  3已下架
  remark?: string; //备注
}

export async function bannerList(
  options?: { [p: string]: any },
): Promise<Paging<BannerItem>> {
  return request('/gm/banner/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function bannerAdd(
  body: BannerItem,
  options?: { [p: string]: any },
): Promise<ResultType<{ gToken: string }>> {
  return request('/gm/banner/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function bannerClose(
  body: { id: number},
  options?: { [p: string]: any },
): Promise<ResultType<{ gToken: string }>> {
  return request('/gm/banner/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function bannerUpdate(
  body: BannerItem,
  options?: { [p: string]: any },
): Promise<ResultType<{ gToken: string }>> {
  return request('/gm/banner/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
