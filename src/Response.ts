import { ServiceNames } from "./services/ServiceNames";
import { ServiceOperations } from "./services/ServiceOperations";
import { log } from "./utils/log";

/**
 *
 *
 * @export
 * @class Response
 */
export class Response {
  public service: ServiceNames;
  public operation: ServiceOperations;
  public data: any;

  /**
   *Creates an instance of Response.
   * @param {ServiceNames} service
   * @param {ServiceOperations} operation
   * @param {*} data
   * @memberof Response
   */
  constructor(service: ServiceNames, operation: ServiceOperations, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  /**
   * Returns this response's service.
   *
   * @return {ServiceNames}
   * @memberof Response
   */
  getService(): ServiceNames {
    return this.service;
  }

  /**
   * Get this response's operation.
   *
   * @return {ServiceOperations}
   * @memberof Response
   */
  getOperation(): ServiceOperations {
    return this.operation;
  }

  /**
   * Return this response's data object.
   *
   * @return {*}
   * @memberof Response
   */
  getData(): any {
    return this.data;
  }

  /**
   * Creates a new `Response` from a POJO.
   *
   * @param {*} json
   * @return {Response}
   * @memberof Response
   */
  static fromJSON(json) {
    try {
      return new Response(json.service, json.operation, json.data);
    } catch (err) {
      log(err);
      throw new Error('Badly formatted json response.');
    }
  }

  /**
   * Return this response as a POJO.
   *
   * @return {*}
   * @memberof Response
   */
  toJSON(): any {
    return {
      'service': this.service,
      'operation': this.operation,
      'data': this.data,
    };
  }

  /**
   * Return this response as stringified JSON.
   *
   * @return {string}
   * @memberof Response
   */
  toJSONString(): string {
    return JSON.stringify(this.toJSON());
  }
}
