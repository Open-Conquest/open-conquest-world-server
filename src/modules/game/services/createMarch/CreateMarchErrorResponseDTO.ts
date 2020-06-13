/* eslint-disable require-jsdoc */
import {CreateMarchErrorResponse} from '../../../../shared/schemas/CreateMarchErrorResponse';

export class CreateMarchErrorResponseDTO implements CreateMarchErrorResponse {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  toJSON(): any {
    return this;
  }

  public get $message(): string {
    return this.message;
  }

  public set $message(value: string) {
    this.message = value;
  }
}