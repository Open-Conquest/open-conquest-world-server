/* eslint-disable require-jsdoc */
import {UserCredentials} from '../../../shared/schemas/UserCredentials';

export class UserCredentialsDTO implements UserCredentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
