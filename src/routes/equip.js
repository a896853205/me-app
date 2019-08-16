// dao
import { equipDao } from '../dao/equip-dao';
import express from 'express';
// result返回对象
import { Result } from '../../util/response';

export const routerInit = () => {
  let router = express.Router();

  // 查询所有装备
  router.post('/queryEquip',async (req, res, next) => {
    let data = await equipDao.queryEquip()
    .catch(err => {
      console.error(err);
    });
    await res.json(new Result(data));
  });
  
  // 插入一个装备
  router.post('/saveEquip', (req, res, next) => {
    if (req.body.uuid) {
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