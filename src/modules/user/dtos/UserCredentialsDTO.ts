/* eslint-disable require-jsdoc */
import {UserCredentials} from '../../../shared/schemas/UserCredentials';

export class UserCredentialsDTO implements UserCredentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public get $username(): string {
    return this.username;
  }

  public get $password(): string {
    return this.password;
  }

  public set $username(value: string) {
    this.username = value;
  }

  public set $password(value: string) {
    this.password = value;
  }
}
