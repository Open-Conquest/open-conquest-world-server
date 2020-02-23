/* eslint-disable require-jsdoc */

export class UserDTO {
  private userID: number;
  private username: string;

  constructor() {}

  public get $userID(): number {
    return this.userID;
  }

  public get $username(): string {
    return this.username;
  }

  public set $userID(value: number) {
    this.userID = value;
  }

  public set $username(value: string) {
    this.username = value;
  }
}
