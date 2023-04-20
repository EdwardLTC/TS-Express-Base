export class Options {
  public statusCode: number;
  public totalCount: number;
  constructor(options: Options = { statusCode: 200, totalCount: 0 }) {
    this.statusCode = options.statusCode || 200;
    this.totalCount = options.totalCount || 0;
  }
}
