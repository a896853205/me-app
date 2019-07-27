export class Result {
  constructor (
    data = {},
    succ = 200,
    status = 1,
    ) {
    this.succ = succ;
    this.status = status;
    this.data = data;
  }
}