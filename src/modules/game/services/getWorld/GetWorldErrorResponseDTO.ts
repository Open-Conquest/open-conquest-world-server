/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {GetWorldErrorResponse} from '../../../../shared/schemas/GetWorldErrorResponse';

export class GetWorldErrorResponseDTO implements GetWorldErrorResponse {
  message: string

  constructor(message: string) {
    this.message = message;
  }

  toJSON(): any {
    return this;
  }
}
