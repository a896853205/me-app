// dao
import { equipDao } from '../dao/equip-dao';

const express = require('express');
let router = express.Router();

// 查询所有装备
router.post('/queryEquip', (req, res, next) => {
  equipDao.queryEquip()
    .then(data => {
      console.dir(data);
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
