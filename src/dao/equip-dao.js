import { equipMapper } from '../resources/mapper/equip-mapper';
const { db } = require('../resources/db-connect');
export const equipDao = {
  // 查询全部的装备
  queryEquip: () => {
    return db.query(equipMapper.query, []);
  }
};