/* eslint-disable require-jsdoc */

/**
 * Class meant to represent the JWT for a user.
 *
 * @export
 * @class JWT
 */
export class JWT {
  private token: string;

  constructor(token: string) {
    if (token === null) {
      return null;
    }
    this.token = token;
  }

  getTokenString(): string {
    return this.token;
  }

  public get $token(): string {
    return this.token;
  }

  public set $token(value: string) {
    this.token = value;
  }
}
