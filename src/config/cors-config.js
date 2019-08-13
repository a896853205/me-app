/**
 * 跨域配置
 * @param {Object} req 请求头
 * @param {Object} res 响应头
 * @param {Function} next 下一步
 */
export const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "accept,content-type,t,os");
  res.header("Access-Control-Allow-Methods", "POST,GET");
  res.header("X-Powered-By", ' 3.2.1');
  // 让options请求快速返回
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
}