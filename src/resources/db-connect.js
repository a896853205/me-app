import { dbConfig } from './mysql-conf';
import mysql from 'mysql';
export const db = {
  /**
   * 数据处理函数,输入sql语句和参数数组和成功函数即可.
   * @param sqllan {String} sql语句
   * @param params {Array} 参数数组
   */
  query (sqllan, params) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(dbConfig);

      // 链接开始
      connection.connect(err => {
        if (err) {
          reject(err);
        }
      });

      // 进行数据处理
      connection.query(sqllan, params, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        // 进行处理
        resolve(rows);
      });
      
      // 链接结束
      connection.end(err => {
        if (err) {
          reject(err);
        }
      })
    });
  },

  /**
   * 事务处理
   * @param {Array} sqlArr [{sqlLan: 'sql语句', sqlParams: ['sql参数1', 'sql参数2']}]
   */
  transactions (sqlArr) {
    try {
      let connection = mysql.createConnection(dbConfig);

      connection.beginTransaction(err => {

        if (err) { 
          throw err 
        }

        sqlArr.forEach(sql => {
          db.transaction(connection, sql.sqlLan, sql.sqlParams);
        })
      })
    } catch(err) {
      console.error('事件处理发生错误:', err);
    }
  },
  /**
   * 事务处理的一次处理
   * @param {Object} connection sql链接
   * @param {String} sqlLan sql语句
   * @param {Array} sqlParams sql语句的参数
   */
  transaction (connection, sqlLan, sqlParams) {
    connection.query(sqlLan, sqlParams, err => {
      if (err) {
        return connection.rollback(() => {
          throw err
        })
      } else {
        connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              throw err
            })
          }
        })
      }
    })
  }
};