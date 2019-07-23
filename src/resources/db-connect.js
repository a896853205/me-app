const connectConfig = require('./mysql-conf');
const mysql = require('mysql');
export default db = {
  query: (sqllan, params, fn) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(connectConfig);
      connection.connect(err => {
        if (err) reject(err);
      });
      connection.query(sqllan, params, (err, rows, fields) => {
        if (err) reject(err);
        // 调用回调函数
        if (fn) resolve(rows);
      });
      connection.end((err) => {
        if(err) reject(err);
      })
    });
  }
};