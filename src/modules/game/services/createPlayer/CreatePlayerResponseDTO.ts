/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import {CreatePlayerResponse} from '../../../../shared/schemas/CreatePlayerResponse';
import {PlayerDTO} from '../../dtos/PlayerDTO';
import {CityDTO} from '../../dtos/CityDTO';
import {ArmyDTO} from '../../dtos/ArmyDTO';
import {ResourcesDTO} from '../../dtos/ResourcesDTO';

/**
 * CreatePlayerRequest DTO implementation.
 *
 * @export
 * @class CreatePlayerResponseDTO
 * @implements {CreatePlayerRequest}
 */
export class CreatePlayerResponseDTO implements CreatePlayerResponse {
  player: PlayerDTO;
  city: CityDTO;
  army: ArmyDTO;
  resources: ResourcesDTO;

  /**
   * Creates an instance of CreatePlayerResponseDTO.
   *
   * @param {PlayerDTO} player
   * @param {CityDTO} city
   * @param {ArmyDTO} army
   * @param {ResourcesDTO} resources
   * @memberof CreatePlayerResponseDTO
   */
  constructor(player: PlayerDTO, city: CityDTO, army: ArmyDTO, resources: ResourcesDTO) {
    this.player = player;
    this.city = city;
    this.army = army;
    this.resources = resources;
  }

  toJSON(): any {
    return this;
  }

  public get $player(): PlayerDTO {
    return this.player;
  }

  public set $player(value: PlayerDTO) {
    this.player = value;
  }
}
