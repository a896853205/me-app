// dao
import { equipDao } from '../dao/equip-dao';
import express from 'express';
// result返回对象
import { Result } from '../../util/response';

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

module.exports = router;
