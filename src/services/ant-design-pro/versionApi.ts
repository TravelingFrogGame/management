import {Paging, ResultType} from "@/typing/request";
import {request} from "@@/exports";

export interface VersionListItem {
  url?: string;
  version?: number;
  updateContent?: string;
  platform?: string;
  id?: number;
}

export async function versionList(
  body: { password: any; account: string | undefined },
  options?: { [p: string]: any },
): Promise<ResultType<Paging<VersionListItem>>> {
  return request('/api/gm/version/list', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

export async function addVersion(
  body: VersionListItem,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<VersionListItem>>> {
  return request('/api/gm/version/add', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function unRelease(
  body: {id: number},
  options?: { [p: string]: any },
): Promise<ResultType<Paging<VersionListItem>>> {
  return request('/api/gm/version/close', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function update(
  body: VersionListItem,
  options?: { [p: string]: any },
): Promise<ResultType<Paging<VersionListItem>>> {
  return request('/api/gm/version/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

