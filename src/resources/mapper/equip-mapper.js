export const equipMapper = {
  insert: 'insert into equip(uuid, name, money, picUrl, des) values(?, ?, ?, ?, ?)',
  deleteById: 'delete from equip where uuid = ?',
  update: 'update equip set name=?, money=?, picUrl=?, des=? where uuid=?',
  query: 'select * from equip',
  getById: 'select * from equip where uuid = ?'
};