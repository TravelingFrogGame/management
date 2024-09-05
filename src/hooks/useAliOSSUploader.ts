import OSS from 'ali-oss'
import path from 'path'
import _ from 'lodash'

export enum UploadFileType {
  Version = 0,
  Assets = 1,
  Announcement
}

export const useAliOSSUploader = () => {
  const ossOptions: OSS.Options = {
    region: 'oss-cn-chengdu',
    accessKeyId: 'LTAI5t7VU76D7putqCRBnDdH',
    accessKeySecret: 'B4cZBzhOqDLawTYjSE110J0c390HFF',
    bucket: 'frogdev',
    endpoint: 'oss-cn-chengdu.aliyuncs.com'
  } as OSS.Options;

  const _getBucketFileName = (fileName: string,folder: string, customFolder?: string) => {
    if (!fileName) {
      return;
    }

    let name = folder;
    if (!_.isEmpty(customFolder)) {
      name = name + customFolder + '/'
    }

    return name + fileName;
  }

  const _getFolder = (fileType: UploadFileType) => {
    let folder = '';
    switch (fileType) {
      case UploadFileType.Assets:
        folder = 'assets/'
        break;
      case UploadFileType.Version:
        folder = 'version/'
        break;
      case UploadFileType.Announcement:
        folder = 'announcement/'
        break;
      default:break;
    }
    return folder;
  }

  const upload = async (fileName: string, obj: any, fileType:UploadFileType,customFolder?: string) => {
    const folder = _getFolder(fileType);
    const bucketFileName = _getBucketFileName(fileName, folder, customFolder);
    console.log(`即将上传的oss bucket:${bucketFileName}`);

    return new Promise((resolve, reject) => {
      const store = new OSS(ossOptions);
      store.put(String(bucketFileName), obj).then(res => {
        const tmp = res as OSS.PutObjectResult;
        resolve(tmp.url);
      }).catch(err => {
        reject(err);
      })
    })

  }

  return {upload};
}
