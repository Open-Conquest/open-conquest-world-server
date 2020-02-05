/**
 *
 *
 * @export
 * @class Response
 */
export class Response {
  public service: string;
  public operation: string;
  public data: any;

  /**
   *Creates an instance of Response.
   * @param {*} service
   * @param {*} operation
   * @param {*} data
   * @memberof Response
   */
  constructor(service, operation, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  getService(): string {
    return this.service;
  }

  getOperation(): string {
    return this.operation;
  }

  getData(): any {
    return this.data;
  }

  /**
   *
   *
   * @param {*} json
   * @return {Response}
   * @memberof Response
   */
  fromJson(json) {
    return new Response(json.service, json.operation, json.data);
  }

  /**
   *
   * @return {Response}
   * @memberof Response
   */
  toJson() {
    return {
      'service': this.service,
      'operation': this.operation,
      'data': this.data,
    };
  }
}
