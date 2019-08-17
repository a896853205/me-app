import { equipMapper } from '../resources/mapper/equip-mapper';
import { db } from '../resources/db-connect';
import { moneyHelper } from '../../util/money-helper';
import uuid from 'uuid/v1';

export const equipDao = {
  // 查询全部的装备
  queryEquip: async () => {
    let allEquip = await db.query(equipMapper.query, []);
    
    // 将所有金钱分转换成元
    // 这里需要修改成从数据库查询图片表-------------
    allEquip.forEach((item, index, arr) => {
      arr[index].money = moneyHelper.parseMoney(item.money);
      arr[index].picUrl = [item.picUrl];
    })

    return allEquip;
  },
  insertEquip: ({name, money, picUrl, des}) => {
    return db.query(equipMapper.insert, [uuid(), name, moneyHelper.formatMoney(money), picUrl, des]);
  },
  updateEquip: ({uuid, name, money, picUrl, des}) => {
    return db.query(equipMapper.update, [name, moneyHelper.formatMoney(money), picUrl, des, uuid]);
  },
  deleteEquip: uuid => {
    return db.query(equipMapper.deleteById, [uuid]);
  }
};