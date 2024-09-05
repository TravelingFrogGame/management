// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type VersionListItem = {
    url?: string;
    version?: number;
    updateContent?: string;
    platform?: string;
    id?: number;
    createTime?: string;
    publishTime?: string;
    creator?: string;
    status?: number; // 1发布成功 2预发布  3已下架
    remark?: string; //备注
  };

  type VersionList = {
    list?: VersionListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type BannerListItem = {
    url?: string;
    id?: number;
    createTime?: string;
    publishTime?: string;
    creator?: string;
    status?: number; // 1发布成功 2预发布  3已下架
    remark?: string; //备注
  }

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
