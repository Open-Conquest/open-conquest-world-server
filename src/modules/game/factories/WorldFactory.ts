import {Map} from '../domain/Map';
import {City} from '../domain/City';
import {Player} from '../domain/Player';
import {World} from '../domain/World';
import {EntityID} from '../../../shared/domain/EntityID';

/**
 * Factory for World entities.
 *
 * @export
 * @class WorldFactory
 */
export class WorldFactory {
  /**
   * Creates an instance of WorldFactory.
   * @memberof WorldFactory
   */
  constructor() {}

  /**
   * Create a new World entity.
   *
   * @param {EntityID} id
   * @param {Array<Player>} players
   * @param {Map} map
   * @param {Array<City>} cities
   * @return {World}
   * @memberof WorldFactory
   */
  createWorld(
      id: EntityID,
      players: Array<Player>,
      map: Map,
      cities: Array<City>,
  ): World {
    return new World(
        id,
        map,
        players,
        cities,
    );
  }
}
