import {Map} from '../domain/Map';
import {MapFactory} from '../factories/MapFactory';
import {MapDTO} from '../dtos/MapDTO';
import {TileMapper} from './TileMapper';
import {TileDTO} from '../dtos/TileDTO';

/**
 * MapMapper is responsible for mappings between the domain map entity
 * and the persistence (sequelize) representation of a map.
 */
export class MapMapper {
  private mapFactory: MapFactory
  private tileMapper: TileMapper;

  /** Creates an instance of MapMapper. */
  constructor() {
    this.mapFactory = new MapFactory();
    this.tileMapper = new TileMapper();
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

  /**
   * Map a domain Map entity to a DTO.
   *
   * @param {Map} map
   * @return {MapDTO}
   * @memberof MapMapper
   */
  toDTO(map: Map): MapDTO {
    const tiles: Array<Array<TileDTO>> = [];
    for (let row = 0; row < map.$tiles.length; row++) {
      tiles.push([]);
      for (let col = 0; col < map.$tiles[row].length; col++) {
        const tile = map.$tiles[row][col];
        tiles[row].push(this.tileMapper.toDTO(tile));
      }
    }
    return new MapDTO(tiles);
  }
}
