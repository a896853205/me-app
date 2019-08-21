import { dbConfig } from './mysql-conf';
import mysql from 'mysql';

export const db = {
  /**
   * 数据处理函数,输入sql语句和参数数组和成功函数即可.
   * @param {SqlObject} sqlObject sql包装对象
   */
  query (sqlObject) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(dbConfig);

      // 链接开始
      connection.connect(err => {
        if (err) {
          reject(err);
        }
      });

      // 进行数据处理
      connection.query(sqlObject.lan, sqlObject.params, (err, rows, fields) => {
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
   * @param {Array} sqlArr [{lan: 'sql语句', params: ['sql参数1', 'sql参数2']}]
   */
  transactions (sqlArr) {
    try {
      let connection = mysql.createConnection(dbConfig);

      connection.beginTransaction(async err => {
        if (err) { 
          throw err 
        }

        for (let sqlObject of sqlArr) {
          if (sqlObject.synchro) {
            await db.transaction(connection, sqlObject);
          } else {
            db.transaction(connection, sqlObject);
          }
        }

        await connection.commit(err => {
          if (err) {
            return connection.rollback(() => {
              throw err
            })
          }
        })
      })
    } catch(err) {
      console.error('事件处理发生错误:', err);
    }
  },

  /**
   * 事务处理的一次处理
   * @param {Object} connection sql链接
   * @param {SqlObject} sqlObject sql的包装对象
   */
  transaction (connection, sqlObject) {
    connection.query(sqlObject.lan, sqlObject.params, err => {
      if (err) {
        return connection.rollback(() => {
          throw err
        })
      }
    })
  }
};

export class SqlObject {
  constructor (
    lan,
    params = [],
    synchro = false
  ) {
    this.lan = lan;
    this.params = params;
    this.synchro = synchro;
  }
}