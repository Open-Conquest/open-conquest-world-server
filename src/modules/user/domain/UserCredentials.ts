/* eslint-disable require-jsdoc */
import {Username} from "./Username";
import {Password} from "./Password";
import {HashedPassword} from './HashedPassword';

export class UserCredentials {
  private _username: Username;
  private _password: Password;
  private hashedPassword: HashedPassword;

  constructor(username: Username, password: Password) {
    this._username = username;
    this._password = password;
  }

  getPasswordString(): string {
    return this._password.getString();
  }

  getUsernameString(): string {
    return this._username.getString();
  }

  getHashedPasswordString(): string {
    return this.hashedPassword.getString();
  }

  getUsername(): Username {
    return this._username;
  }
}
