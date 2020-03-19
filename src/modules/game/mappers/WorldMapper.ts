import {World} from '../domain/World';
import {WorldDTO} from '../dtos/WorldDTO';
import {PlayerMapper} from './PlayerMapper';
import {CityMapper} from './CityMapper';
import {MapMapper} from './MapMapper';
import {CityDTO} from '../dtos/CityDTO';
import {MapDTO} from '../dtos/MapDTO';
import {PlayerDTO} from '../dtos/PlayerDTO';

/**
 * Mapping definitions for the Map entity.
 *
 * @export
 * @class WorldMapper
 */
export class WorldMapper {
  private playerMapper: PlayerMapper;
  private cityMapper: CityMapper;
  private mapMapper: MapMapper;

  /**
   * Creates an instance of WorldMapper.
   * @memberof WorldMapper
   */
  constructor() {
    this.playerMapper = new PlayerMapper();
    this.cityMapper = new CityMapper();
    this.mapMapper = new MapMapper();
  }

  /**
   * Map to World domain entity to a WorldDTO.
   *
   * @param {World} world
   * @return {WorldDTO}
   * @memberof WorldMapper
   */
  toDTO(world: World): WorldDTO {
    // convert players
    const players: Array<PlayerDTO> = [];
    for (let i = 0; i < world.$players.length; i++) {
      players.push(this.playerMapper.toDTO(world.$players[i]));
    }

    // convert map
    const map: MapDTO = this.mapMapper.toDTO(world.$map);

    // convert cities
    const cities: Array<CityDTO> = [];
    for (let i = 0; i < world.$cities.length; i++) {
      cities.push(this.cityMapper.toDTO(world.$cities[i]));
    }

    return new WorldDTO(
        world.$id.$value,
        map,
        cities,
        players,
    );
  }
}
