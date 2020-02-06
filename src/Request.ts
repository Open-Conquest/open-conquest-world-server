import {logError as logError} from './utils/log';
import { ServiceNames } from './services/ServiceNames';

/**
 *
 *
 * @export
 * @class Request
 */
export class Request {
  public operation: string;
  public serviceName: ServiceNames;
  public data: any;

  /**
   *Creates an instance of Request.
   * @param {*} serviceName
   * @param {*} operation
   * @param {*} data
   * @memberof Request
   */
  constructor(serviceName, operation, data) {
    this.serviceName = serviceName;
    this.operation = operation;
    this.data = data;
  }

  /**
   *
   *
   * @return {any}
   * @memberof Request
   */
  toJson() {
    return {
      'service': this.serviceName,
      'operation': this.operation,
      'data': this.data,
    };
  }

  /**
   *
   *
   * @return {JSON}
   * @memberof Request
   */
  getJson() {
    return this.toJson();
  }

  /**
   *
   *
   * @return {JSON}
   * @memberof Request
   */
  getJsonString() {
    return JSON.stringify(this.toJson());
  }
}

export interface IRequestData {
  toJson()
  fromJson(json: any)
}

/**
 *
 *
 * @param {*} request
 * @return {Request}
 */
export function fromRequest(request) {
  try {
    const json = JSON.parse(request.utf8Data);
    const service = json.service;
    const operation = json.operation;
    const data = json.data;
    return new Request(service, operation, data);
  } catch (err) {
    logError('Could not create Request from request: ' +
              JSON.stringify(request));
    logError(err.stack);
    throw err;
  }
}
