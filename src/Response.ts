/**
 *
 *
 * @export
 * @class Response
 */
export class Response {
  public service;
  public operation;
  public data;

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

module.exports = Response;
