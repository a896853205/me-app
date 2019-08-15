import express from 'express';
import { getUploadToken } from '../config/qiniu-config';
// result返回对象
import { Result } from '../../util/response';

export const routerInit = () => {
  let router = express.Router();
  // 查询所有装备
  router.post('/getuploadtoken', (req, res, next) => {
    res.json(
      new Result(getUploadToken(req.body.fileType))
    );
  });

  return router;
}