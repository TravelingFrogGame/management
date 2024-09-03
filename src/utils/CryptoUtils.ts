import CryptoJS from 'crypto-js';

export namespace CryptoUtils {
  export function md5Encode(str: string) {
    return CryptoJS.MD5(str).toString();
  }
}
