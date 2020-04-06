/* eslint-disable require-jsdoc */
import {World} from '../../../shared/schemas/World';
import {CityDTO} from './CityDTO';
import {MapDTO} from './MapDTO';
import {PlayerDTO} from './PlayerDTO';
import {MarchDTO} from './MarchDTO';

/**
 * DTO object for world.
 *
 * @export
 * @class WorldDTO
 * @implements {World}
 */
export class WorldDTO implements World {
  id: number;
  map: MapDTO;
  cities: Array<CityDTO>;
  players: Array<PlayerDTO>;
  marches: Array<MarchDTO>

  constructor(
      id: number,
      map: MapDTO,
      cities: Array<CityDTO>,
      players: Array<PlayerDTO>,
      marches: Array<MarchDTO>,
  ) {
    this.id = id;
    this.map = map;
    this.cities = cities;
    this.players = players;
    this.marches = marches;
  }

  public get $id(): number {
    return this.id;
  }

  public get $map(): MapDTO {
    return this.map;
  }

  public get $cities(): Array<CityDTO> {
    return this.cities;
  }

  public get $players(): Array<PlayerDTO> {
    return this.players;
  }

  public get $marches(): Array<MarchDTO> {
    return this.marches;
  }

  public set $id(value: number) {
    this.id = value;
  }

  public set $map(value: MapDTO) {
    this.map = value;
  }

  public set $cities(value: Array<CityDTO>) {
    this.cities = value;
  }

  public set $players(value: Array<PlayerDTO>) {
    this.players = value;
  }

  public set $marches(value: Array<MarchDTO>) {
    this.marches = value;
  }
}
