import { equipMapper } from '../resources/mapper/equip-mapper';
import { imageMapper } from '../resources/mapper/image-mapper';

import { db, SqlObject } from '../resources/db-connect';
import { moneyHelper } from '../../util/money-helper';

import uuid from 'uuid/v1';

export const equipDao = {
  // 查询全部的装备
  queryEquip: async bImportance => {
    let allEquip = [];

    if (bImportance) {
      allEquip = await db.query(
        new SqlObject(equipMapper.query)
      );
    } else {
      allEquip = await db.query(
        new SqlObject(equipMapper.queryOld)
      );
    }

    for (let i = 0; i < allEquip.length; i++) {
      let item = allEquip[i],
          picArr = [],
          picUrl = [];
      
      // 装备的图片进行数组处理
      picArr = await db.query(
        new SqlObject(imageMapper.queryByUuid, [item.uuid])
      );
      picArr.forEach(pic => {
        picUrl.push(pic.picUrl);
      })
      allEquip[i].picUrl = picUrl;
      
      // 装备金钱分转换成元
      allEquip[i].money = moneyHelper.parseMoney(item.money);
    }

    return allEquip;
  },

  // 增加一个装备
  insertEquip: ({name, money, picUrl, des, importance}) => {
    let equipUuid = uuid(),
        transaction = [];
    
    // 插入装备语句
    transaction.push(new SqlObject(
      equipMapper.insert,
      [equipUuid, name, moneyHelper.formatMoney(money), des, importance]
    ));
    
    if (picUrl) {
      // 图片数组插入语句
      picUrl.forEach(url => {
        transaction.push(new SqlObject(
          imageMapper.insert,
          [uuid(), url, equipUuid]
        ))
      })
    }
    
    // 进行事务处理
    db.transactions(transaction);
  },

  updateEquip: ({uuid: euqipUuid, name, money, picUrl, des, importance}) => {
    let transaction = [];
    
    // 更新装备元数据
    transaction.push(
      new SqlObject(
        equipMapper.update,
        [name, moneyHelper.formatMoney(money), des, importance, euqipUuid]
      )
    );
    
    // 删除之前的有关图片
    transaction.push(
      new SqlObject(
        imageMapper.deleteByUuid,
        [euqipUuid],
        true
      )
    );

    // 增加新的图片
    picUrl.forEach((url, index) => {
      transaction.push(new SqlObject(
        imageMapper.insert,
        [uuid(), url, euqipUuid],
        !index
      ))
    })

    // 进行事务处理
    db.transactions(transaction);
  },

  // 删除一个装备
  deleteEquip: uuid => {
    let transaction = [];
    
    // 删除装备信息
    transaction.push(
      new SqlObject(
        equipMapper.deleteById,
        [uuid]
      )
    );

    // 删除对应图片
    // 将来还要删除七牛的图片缓存
    transaction.push(
      new SqlObject(
        imageMapper.deleteByUuid,
        [uuid]
      )
    )

    // 进行事务处理
    db.transactions(transaction);
  },

  buyEquip: ({uuid, importance}) => {
    db.query(
      new SqlObject(equipMapper.buyEquip, [importance, uuid])
    );
  }
};