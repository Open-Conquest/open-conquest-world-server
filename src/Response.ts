export class Response {
  public service;
  public operation;
  public data;

  constructor(service, operation, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  fromJson(json) {
    return new this(json.service, json.operation, json.data);
  }

  toJson() {
    return {
      'service': this.service,
      'operation': this.operation,
      'data': this.data,
    };
  }
}

module.exports = Response;
