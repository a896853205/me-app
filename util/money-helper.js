export let moneyHelper = {};

moneyHelper.formatMoney = unformatMoney => {
  // 保存的时候变成分
  return parseFloat(unformatMoney * 100);
}