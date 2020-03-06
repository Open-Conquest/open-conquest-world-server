/* eslint-disable require-jsdoc */

export class UserDTO {
  private userID: number;
  private username: string;

  constructor(userID: number, username: string) {
    this.userID = userID,
    this.username = username;
  }

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
