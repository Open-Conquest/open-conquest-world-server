/* eslint-disable require-jsdoc */
import {CreateMarchResponse} from '../../../../shared/schemas/CreateMarchResponse';
import {MarchDTO} from '../../dtos/MarchDTO';

export class CreateMarchResponseDTO implements CreateMarchResponse {
  march: MarchDTO;

  constructor($march: MarchDTO) {
    this.march = $march;
  }

  public get $march(): MarchDTO {
    return this.march;
  }

  public set $march(value: MarchDTO) {
    this.march = value;
  }
}
