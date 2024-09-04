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
  return request('/gm/version/list', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}
