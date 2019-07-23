export default euqipSqlMap = {
  insert: 'insert into equip(uuid, name, money, picUrl, desc) values(?, ?, ?, ?, ?)',
  deleteById: 'delete from equip where uuid = ?',
  // update: 'update user set username=?, password=? where id=?',
  list: 'select * from equip',
  getById: 'select * from equip where uuid = ?'
};