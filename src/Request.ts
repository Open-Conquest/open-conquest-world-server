import {logError as logError} from './utils/log';

export class Request {
  public operation;
  public service;
  public data;

  constructor(service, operation, data) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  toJson() {
    return {
      'service': this.service,
      'operation': this.operation,
      'data': this.data,
    };
  }

  getJson() {
    return this.toJson();
  }

  getJsonString() {
    return JSON.stringify(this.toJson());
  }
}

export function fromRequest(request) {
  try {
    const json = JSON.parse(request.utf8Data);
    const service = json.service;
    const operation = json.operation;
    const data = json.data;
    return new Request(service, operation, data);
  } catch (err) {
    logError('Could not create Request from request: ' + JSON.stringify(request));
    logError(err.stack);
    throw err;
  }
}
