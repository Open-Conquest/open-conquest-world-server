/* eslint-disable require-jsdoc */
import {City} from '../domain/City';
import {EntityID} from '../../../shared/domain/EntityID';
import {CityName} from '../domain/CityName';
import {CityLevel} from '../domain/CityLevel';
import {Player} from '../domain/Player';

/**
 * This class is meant to handle the construction of `City` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of City.
 *
 * @class CityFactory
 */
export class CityFactory {
  /**
   * Creates an instance of CityFactory.
   * @memberof CityFactory
   */
  constructor() {}

  createCity(id: number, name: string, level: number): City {
    return new City(
        new EntityID(id),
        new CityName(name),
        new CityLevel(level),
    );
  }

  /**
   * Creates the default city for a new player.
   *
   * @param {Player} player
   * @return {City}
   * @memberof CityFactory
   */
  createDefaultCity(player: Player): City {
    return new City(
        null,
        new CityName(player.$name.$value),
        new CityLevel(1),
    );
  }
}
