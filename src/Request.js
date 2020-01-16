const logError = require('./utils/log').logError;

class Request {
  constructor(service, operation, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  toJson() {
    return {
      "service": this.service,
      "operation": this.operation,
      "data": this.data
    }
  }

  getJson() {
    return this.toJson();
  }

  getJsonString() {
    return JSON.stringify(this.toJson());
  }
}

function fromRequest(request) {
  try {
    let json = JSON.parse(request.utf8Data);
    let service = json.service;
    let operation = json.operation;
    let data = json.data;
    return new Request(service, operation, data);
  } catch (err) {
    logError('Could not create Request from request: ' + JSON.stringify(request));
    logError(err.stack);
    throw err;
  }
}

Request.fromRequest = fromRequest;

module.exports = Request
