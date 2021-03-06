/* eslint-disable require-jsdoc */
import {IDTO} from './IDTO';
import {ServiceNames} from '../infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../infra/ws/routing/ServiceOperations';
import { JWTDTO } from './JWTDTO';
import { UserDTO } from '../../modules/user/dtos/UserDTO';

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
  private token: JWTDTO;
  private user: UserDTO;
  private data: any;

  /**
   * Creates an instance of MessageDTO.
   *
   * @param {ServiceNames} service
   * @param {ServiceOperations} operation
   * @param {JWTDTO} token
   * @param {UserDTO} user
   * @param {any} data
   * @memberof MessageDTO
   */
  constructor(service: ServiceNames, operation: ServiceOperations, token: JWTDTO, user: UserDTO, data: any) {
    this.$service = service;
    this.$operation = operation;
    this.$token = token;
    this.$user = user;
    this.$data = data;
  }

  public get $service(): ServiceNames {
    return this.service;
  }

  public get $operation(): ServiceOperations {
    return this.operation;
  }

  public get $token(): JWTDTO {
    return this.token;
  }

  public get $user(): UserDTO {
    return this.user;
  }

  public get $data(): any {
    return this.data;
  }

  public set $service(value: ServiceNames) {
    this.service = value;
  }

  public set $operation(value: ServiceOperations) {
    this.operation = value;
  }

  public set $token(value: JWTDTO) {
    this.token = value;
  }

  public set $user(value: UserDTO) {
    this.user = value;
  }

  public set $data(value: any) {
    this.data = value;
  }

  toJSON(): any {
    return this;
  }

  toJSONString(): string {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(json: any): MessageDTO {
    const message = new MessageDTO(null, null, null, null, null);
    message.$service = json['service'];
    message.$operation = json['operation'];
    message.$token = json['token'];
    message.$data = json['data'];

    return message;
  }

  static fromJSONString(jsonString: string): MessageDTO {
    throw new Error('Must be implemented in subclass');
  }
}
