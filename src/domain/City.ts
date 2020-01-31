/**
 * Enum for city levels.
 *
 * @enum {number}
 */
export enum CityLevel {
  One = 1,
  Two,
  Three,
  Four,
  Five
}

/**
 * Domain model for a `City`.
 *
 * @export
 * @class City
 */
export class City {
  private id: number;
  private name: string;
  private level: CityLevel;

  /**
   * Creates an instance of City.
   *
   * @param {CityLevel} level
   * @memberof City
   */
  constructor(level: CityLevel) {
    // do something
    this.level = level;
  }
}
