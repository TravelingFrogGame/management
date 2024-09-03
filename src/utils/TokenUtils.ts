import {DataUtils} from "@/utils/DataUtils";

const tokenKey = 'tokenId';
export namespace TokenUtils {
  export async function setToken(token: string) {
    await localStorage.setItem(tokenKey, token);
  }

  export function getToken() {
    const token = localStorage.getItem(tokenKey);
    return token || null;
  }

  export function clearToken() {
    localStorage.removeItem(tokenKey);
  }

  export function isLogin() {
    const token =  getToken();
    return !DataUtils.isEmpty(token);
  }
}
