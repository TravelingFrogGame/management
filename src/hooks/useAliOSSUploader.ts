import OSS from 'ali-oss'
import path from 'path'
import _ from 'lodash'

export enum UploadFileType {
  Version = 0,
  Assets = 1
}

export const useAliOSSUploader = () => {
  const ossOptions: OSS.Options = {
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
      default:break;
    }
    return folder;
  }

  const upload = async (fileName: string, obj: any, fileType:UploadFileType,customFolder?: string) => {
    const folder = _getFolder(fileType);
    const bucketFileName = _getBucketFileName(fileName, folder, customFolder);
    console.log(`即将上传的oss bucket:${bucketFileName}`);

    const store = new OSS(ossOptions);
    store.put(String(bucketFileName), obj).then(res => {
      console.log(`上传成功:${JSON.stringify(res)}`);
    }).catch(err => {
      console.log(`上传失败:${JSON.stringify(err)}`);
    })
  }

  return {upload};
}
