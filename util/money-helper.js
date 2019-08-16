export let moneyHelper = {};

moneyHelper.formatMoney = unformatMoney => {
  // 保存的时候变成分
  return parseFloat(unformatMoney * 100);
}

moneyHelper.parseMoney = unParseMoney => {
  // 显示的时候显示分
  return `${unParseMoney / 100}`;
}