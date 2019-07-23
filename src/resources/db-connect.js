import { dbConfig } from './mysql-conf';
const mysql = require('mysql');
export const db = {
  /**
   * 数据处理函数,输入sql语句和参数数组和成功函数即可.
   * @param sqllan {String} sql语句
   * @param params {Array} 参数数组
   */
  query: (sqllan, params) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(dbConfig);
      // 链接开始
      connection.connect(err => {
        if (err) reject(err);
      });
      // 进行数据处理
      connection.query(sqllan, params, (err, rows, fields) => {
        if (err) reject(err);
        // 进行处理
        resolve(rows);
      });
      // 链接结束
      connection.end((err) => {
        if(err) reject(err);
      })
    });
  }
};