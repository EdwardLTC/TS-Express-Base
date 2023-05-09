import { HtppError } from './httpError';

/**
 * @author Edward
 * @class HttpException
 * @description this class is used to create a exception object for the API
 * @param err as HtppError
 * @requires err as HtppError
 * @exports HttpException
 */

export class HttpException {
  public error: boolean;
  public responseTimestamp: Date;
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(err: HtppError) {
    let errName = 'InternalServerer';
    switch (err.statusCode) {
      case 409:
        errName = 'ConflictError';
        break;
      case 422:
        errName = 'ValidationError';
        break;
      case 401:
        errName = 'UnauthorizedError';
        break;
      case 403:
        errName = 'ForbiddenError';
        break;
      case 404:
        errName = 'NotFoundError';
        break;
      case 400:
        errName = 'BadRequestError';
        break;
      case 500:
        errName = 'InternalServerError';
      default:
        errName = 'InternalServerError';
    }
    this.error = true;
    this.responseTimestamp = new Date();
    this.statusCode = err.statusCode ? err.statusCode : 500;
    this.message = err.message || 'Something wrong!';
    this.name = errName;
  }
}
