/* eslint-disable require-jsdoc */

/**
 * Class meant to represent the JWT for a user.
 *
 * @export
 * @class JWT
 */
export class JWT {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  getTokenString(): string {
    return this._token;
  }
}
