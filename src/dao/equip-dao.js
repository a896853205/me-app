import { equipMapper } from '../resources/mapper/equip-mapper';
import { db } from '../resources/db-connect';
import { moneyHelper } from '../../util/money-helper';
import uuid from 'uuid/v1';

export const equipDao = {
  // 查询全部的装备
  queryEquip: () => {
    return db.query(equipMapper.query, []);
  },
  insertEquip: ({name, money, picUrl, des}) => {
    return db.query(equipMapper.insert, [uuid(), name, moneyHelper.formatMoney(money), 'picUrl', des]);
  }
};