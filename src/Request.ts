import {log} from './utils/log';
import {ServiceNames} from './services/ServiceNames';
import {ServiceOperations} from './services/ServiceOperations';
/**
 *
 *
 * @export
 * @class Request
 */
export class Request {
  public operation: ServiceOperations;
  public service: ServiceNames;
  public data: any;

  /**
   *Creates an instance of Request.
   * @param {*} service
   * @param {*} operation
   * @param {*} data
   * @memberof Request
   */
  constructor(service: ServiceNames, operation: ServiceOperations, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  /**
   * Returns this request's service.
   *
   * @return {ServiceNames}
   * @memberof Request
   */
  getService(): ServiceNames {
    return this.service;
  }

  /**
   * Get this request's operation.
   *
   * @return {ServiceOperations}
   * @memberof Request
   */
  getOperation(): ServiceOperations {
    return this.operation;
  }

  /**
   * Return this request's data object.
   *
   * @return {*}
   * @memberof Request
   */
  getData(): any {
    return this.data;
  }

  /**
   * Creates a new `Request` from a POJO.
   *
   * @param {*} json
   * @return {Request}
   * @memberof Request
   */
  static fromJSON(json) {
    try {
      return new Request(json.service, json.operation, json.data);
    } catch (err) {
      log(err);
      throw new Error('Badly formatted json request.');
    }
  }

  /**
   * Return this request as a POJO.
   *
   * @return {*}
   * @memberof Request
   */
  toJSON(): any {
    return {
      'service': this.service,
      'operation': this.operation,
      'data': this.data,
    };
  }

  /**
   * Return this request as stringified JSON.
   *
   * @return {string}
   * @memberof Request
   */
  toJSONString(): string {
    return JSON.stringify(this.toJSON());
  }
}