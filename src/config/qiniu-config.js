import uuid from 'uuid/v1';
import { ACCESSKEY, SECRETKEY } from '../constants/keys';
import qiniu from 'qiniu';

export const options = {
  scope: 'a896853205',
  returnBody: '{ "data": {"key":"$(key)","hash":"$(etag)","name":"$(x:name)"} ,"succ": 200, "status": 1 }',
};

export function getUploadToken () {
  const mac = new qiniu.auth.digest.Mac(ACCESSKEY, SECRETKEY);

  // 简单上传凭证
  let putPolicy = new qiniu.rs.PutPolicy(options);
  return  putPolicy.uploadToken(mac);
}
