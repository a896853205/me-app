export const imageMapper = {
  insert: 'insert into image(uuid, picUrl, fk_uuid) values(?, ?, ?)',
  deleteByUuid: 'delete from image where fk_uuid = ?',
  // update: 'update equip set name=?, money=?, picUrl=?, des=? where uuid=?',
  // query: 'select * from equip',
  queryByUuid: 'select * from image where fk_uuid = ?'
};