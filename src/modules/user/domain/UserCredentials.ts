/* eslint-disable require-jsdoc */
import {Username} from "./Username";
import {Password} from "./Password";
import {HashedPassword} from './HashedPassword';

export class UserCredentials {
  private username: Username;
  private password: Password;
  private hashedPassword: HashedPassword;

  constructor(username: Username, password: Password) {
    this.username = username;
    this.password = password;
  }

  getPasswordString(): string {
    return this.password.getString();
  }

  getUsernameString(): string {
    return this.username.getString();
  }

  getHashedPasswordString(): string {
    return this.hashedPassword.getString();
  }

  getUsername(): Username {
    return this.username;
  }

  public get $username(): Username {
    return this.username;
  }

  public get $password(): Password {
    return this.password;
  }

  public get $hashedPassword(): HashedPassword {
    return this.hashedPassword;
  }

  public set $username(value: Username) {
    this.username = value;
  }

  public set $password(value: Password) {
    this.password = value;
  }

  public set $hashedPassword(value: HashedPassword) {
    this.hashedPassword = value;
  }
}
