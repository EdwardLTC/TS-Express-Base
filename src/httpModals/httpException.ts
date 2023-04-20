import { HtppError } from './httpError';

/**
 * @author Edward
 * @class HttpException
 * @description this class is used to create a exception object for the API
 * @param err as HtppError
 * @requires err as HtppError
 * @exports HttpException
 */

export class HttpException extends Error {
  public error: boolean;
  public responseTimestamp: Date;
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(err: HtppError) {
    super();
    let errName = 'InternalServerer';
    switch (err.statusCode) {
      case 409:
        errName = 'ConflictEr';
        break;
      case 422:
        errName = 'Validationer';
        break;
      case 401:
        errName = 'Unauthorizeder';
        break;
      case 403:
        errName = 'Forbiddener';
        break;
      case 404:
        errName = 'NotFounder';
        break;
      case 400:
        errName = 'BadRequster';
        break;
      case 500:
        errName = 'InternalServerer';
      default:
        errName = 'InternalServerer';
    }
    this.error = true;
    this.responseTimestamp = new Date();
    this.statusCode = err.statusCode ? err.statusCode : 500;
    this.message = err.message || 'Something wrong!';
    this.name = errName;
  }
}
