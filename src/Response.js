class Response {
  constructor(service, operation, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  fromJson(json) {
    return new this(json.service, json.operation, json.data);
  }

  toJson() {
    return JSON(this);
  }
}

module.exports = Response;
