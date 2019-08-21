// dao
import { equipDao } from '../dao/equip-dao';
import express from 'express';
// result返回对象
import { Result } from '../../util/response';

export const routerInit = () => {
  let router = express.Router();

  // 查询所有装备
  router.post('/queryEquip', async (req, res, next) => {
    let data = await equipDao.queryEquip()
    .catch(err => {
      console.error(err);
    });
    
    await res.json(new Result(data));
  });
  
  // 保存一个装备
  router.post('/saveEquip', async (req, res, next) => {
    if (req.body.uuid) {
      // 更新操作
      let data = await equipDao.updateEquip(req.body);

      await res.json(new Result(data));
    } else {
      // 增加操作
      let data = await equipDao.insertEquip(req.body);

      await res.json(new Result(data));
    }
  });

  // 删除指定装备
  router.post('/deleteEquip', async (req, res, next) => {
    await equipDao.deleteEquip(req.body.uuid);

    await res.json(new Result());
  });
  
  return router;
}