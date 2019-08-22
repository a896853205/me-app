export const equipMapper = {
  insert: 'insert into equip(uuid, name, money, des, importance) values(?, ?, ?, ?, ?)',
  deleteById: 'delete from equip where uuid = ?',
  update: 'update equip set name=?, money=?, des=?, importance=? where uuid=?',
  query: 'select * from equip where importance > 0 order by importance desc',
  queryOld: 'select * from equip where importance < 1',
  getById: 'select * from equip where uuid = ?',
  buyEquip: 'update equip set importance=? where uuid=?',
};