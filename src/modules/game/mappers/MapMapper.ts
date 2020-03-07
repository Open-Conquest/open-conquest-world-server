import {Map} from '../domain/Map';
import {MapFactory} from '../factories/MapFactory';
// import {MapDTO} from '../dtos/MapDTO';

/**
 * MapMapper is responsible for mappings between the domain map entity
 * and the persistence (sequelize) representation of a map.
 */
export class MapMapper {
  private mapFactory: MapFactory

  /** Creates an instance of MapMapper. */
  constructor() {
    this.mapFactory = new MapFactory();
  }

  /**
   * Create a domain entity `Map` from a sequelize object.
   *
   * @param {*} dbMap
   * @return {Map}
   * @memberof MapMapper
   */
  fromPersistence(dbMap: any): Map {
    if (dbMap === null) {
      return null;
    }

    return this.mapFactory.createMap(
        dbMap.map_id,
        dbMap.map_name,
        dbMap.max_rows,
        dbMap.max_cols,
    );
  }
}
