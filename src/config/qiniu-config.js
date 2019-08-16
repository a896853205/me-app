import uuid from 'uuid/v1';
import { ACCESSKEY, SECRETKEY } from '../constants/keys';
import qiniu from 'qiniu';

const imageDomin = 'www.elricuna.top';

export function getUploadToken (fileType) {
  // 生成秘钥和key
  const mac = new qiniu.auth.digest.Mac(ACCESSKEY, SECRETKEY),
        key = `${uuid()}.${fileType.split('/')[1]}`,
        options = {
          scope: `a896853205:${key}`,
          returnBody: '{ "data": {"key": "$(key)", "hash": "$(etag)",' +
            `"imageDomin": "${imageDomin}"}` +
            ',"succ": 200, "status": 1 }',
        };

  // 简单上传凭证
  let putPolicy = new qiniu.rs.PutPolicy(options);

  return  { 
    token: putPolicy.uploadToken(mac),
    key
  };
}
