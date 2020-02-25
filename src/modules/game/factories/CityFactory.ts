/* eslint-disable require-jsdoc */
import {City} from '../domain/City';
import {EntityID} from '../../../shared/domain/EntityId';
import {Cityname} from '../domain/Cityname';
import { CityLevel } from '../domain/CityLevel';

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
        new Cityname(name),
        new CityLevel(level),
    );
  }
}
