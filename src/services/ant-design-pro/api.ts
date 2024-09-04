// @ts-ignore
import { request } from '@umijs/max';
import {ResultCode, ResultType} from "@/typing/request";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }):Promise<ResultType<any>> {
  // return {
  //   code: ResultCode.Success,
  //   success: true,
  //   data: {
  //     name: 'root',
  //     access: 'admin'
  //   }
  // }
  return request<{
    data: API.CurrentUser;
  }>('/gm/info/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: { password: any; account: string | undefined }, options?: { [p: string]: any }): Promise<ResultType<{gToken: string}>> {
  return request('/gm/info/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function versionList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.VersionList>('gm/version/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.VersionListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addVersion(options?: { [key: string]: any }) {
  return request<API.VersionListItem>('gm/version/add', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
