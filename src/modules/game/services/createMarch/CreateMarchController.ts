import {CreateMarchRequestDTO} from './CreateMarchRequestDTO';
import {UserDTO} from '../../../user/dtos/UserDTO';
import {CreateMarchService} from './CreateMarchService';
import {MarchMapper} from '../../mappers/MarchMapper';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {CreateMarchResponseDTO} from './CreateMarchResponseDTO';
import {CreateMarchErrorResponseDTO} from './CreateMarchErrorResponseDTO';

export enum CreateMarchErrorResponses {
  UnauthorizedUser = 'User is not authorized to create march for player',
  InsufficientUnits = 'Player has insufficient units to create march',
  NonexistentPlayer = 'Tried to create march for player that does not exist',
  NonexistentTile = 'Tried to create march for nonexistent tile',
}

/**
 * Controller for createMarch request.
 * @export
 * @class CreateMarchController
 */
export class CreateMarchController {
  private createMarchService: CreateMarchService;
  private marchMapper: MarchMapper;
  private playerMapper: PlayerMapper;

  /**
   * Creates an instance of CreateMarchController.
   * @param {CreateMarchService} createMarchService
   */
  constructor(createMarchService: CreateMarchService) {
    this.createMarchService = createMarchService;
    this.marchMapper = new MarchMapper();
    this.playerMapper = new PlayerMapper();
  }

  /**
   * Handler for createMarch request.
   *
   * @param {UserDTO} user
   * @param {CreateMarchRequestDTO} incomingDTO
   * @memberof CreateMarchController
   */
  async createMarch(
      user: UserDTO, incomingDTO: CreateMarchRequestDTO,
  ): Promise<CreateMarchResponseDTO | CreateMarchErrorResponseDTO> {
    try {
      // check that player belongs to user
      // create march
      const march = this.marchMapper.fromDTO(incomingDTO.$march);
      const player = this.playerMapper.fromDTO(incomingDTO.$player);
      const createdMarch = await this.createMarchService.createMarch(
          player, march,
      );
      const createdMarchDTO = this.marchMapper.toDTO(createdMarch);
      return new CreateMarchResponseDTO(createdMarchDTO);
    } catch (err) {
      switch (err.message) {
      }
    }
  }
}
