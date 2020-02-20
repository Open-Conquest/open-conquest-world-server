/* eslint-disable require-jsdoc */
import {IDTO} from './IDTO';
import {ServiceNames} from '../infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../infra/ws/routing/ServiceOperations';

/**
 * Data transfer object representing a message sent to or from the WebSocket
 * server.
 *
 * @export
 * @class MessageDTO
 * @implements {IDTO}
 */
export class MessageDTO implements IDTO {
  private service: ServiceNames;
  private operation: ServiceOperations;
  private data: any;

  /**
   * Creates an instance of MessageDTO.
   *
   * @param {ServiceNames} service
   * @param {ServiceOperations} operation
   * @param {*} data
   * @memberof MessageDTO
   */
  constructor(service: ServiceNames, operation: ServiceOperations, data: any) {
    this.service = service;
    this.operation = operation;
    this.data = data;
  }

  getService(): ServiceNames {
    return this.service;
  }

  getOperation(): ServiceOperations {
    return this.operation;
  }

  getData(): any {
    return this.data;
  }

  toJSON(): any {
    return this;
  }

  toJSONString(): string {
    throw new Error('Must be implemented in subclass');
  }

  static fromJSON(json: any): MessageDTO {
    throw new Error('Must be implemented in subclass');
  }

  static fromJSONString(jsonString: string): MessageDTO {
    throw new Error('Must be implemented in subclass');
  }
}
