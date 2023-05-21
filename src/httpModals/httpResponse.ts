import { Options } from './httpOptions';

/**
 * @description This is the default list of keys that will be excluded from the response
 * @description Add the keys that you want to exclude from the response
 */
const defaultExcludedItemsFromResponse = ['__v', 'password'];

/**
 * @author Edward
 * @class HttpResponse
 * @description This class is used to create a response object for the API
 * @defaultExcludedItemsFromResponse ['__v', 'password']
 * @param data
 * @param options
 * @requires data
 * @exports HttpResponse
 */

export class HttpResponse {
  public error = false;
  public responseTimestamp = new Date();
  public data: any;
  public statusCode: number;
  public totalCount: number;

  constructor(data: any, options: Options = { totalCount: 0, statusCode: 200 }) {
    this.statusCode = options.statusCode || 200;
    let filteredData = data;
    if (typeof filteredData === 'object') {
      filteredData = this.filterData(JSON.parse(JSON.stringify(filteredData)));
    }

    if (Array.isArray(filteredData)) {
      this.data = [...filteredData];
      this.totalCount = options.totalCount || undefined;
    } else if (typeof filteredData === 'object') {
      this.data = { ...filteredData };
    } else {
      this.data = data;
    }
  }

  filterData(data: any) {
    if (Array.isArray(data)) {
      data.map((x, index) => {
        Object.keys(x).forEach(key => {
          if (defaultExcludedItemsFromResponse.includes(key)) {
            delete data[index][key];
          }
        });
      });
    } else if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          this.filterData(data[key]);
        }
        if (defaultExcludedItemsFromResponse.includes(key)) {
          delete data[key];
        }
      });
    }
    return data;
  }
}
