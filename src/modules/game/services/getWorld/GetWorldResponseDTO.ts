/* eslint-disable require-jsdoc */
import {WorldDTO} from '../../dtos/WorldDTO';

export class GetWorldResponseDTO {
  world: WorldDTO;

  constructor(world: WorldDTO) {
    this.world = world;
  }

  public get $world(): WorldDTO {
    return this.world;
  }

  public set $world(value: WorldDTO) {
    this.world = value;
  }
}
