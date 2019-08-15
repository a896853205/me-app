// dao
import { equipDao } from '../dao/equip-dao';
import express from 'express';
// result返回对象
import { Result } from '../../util/response';

export const routerInit = () => {
  let router = express.Router();

  // 查询所有装备
  router.post('/queryEquip', (req, res, next) => {
    equipDao.queryEquip()
      .then(data => {
        res.json(new Result(data));
      })
      .catch(err => {
        console.error(err);
      });
  });
  
  // 插入一个装备
  router.post('/saveEquip', (req, res, next) => {
    if (req.body.id) {
      // 更新操作
    } else {
      // 增加操作
      console.dir(req.body);
      equipDao.insertEquip(req.body)
      .then(data => {
        res.json(new Result(data));
      })
      .catch(err => {
        console.error(err);
      });
    }
  });

  return router;
}