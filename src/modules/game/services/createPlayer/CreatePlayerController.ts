import {UserDTO} from '../../../user/dtos/UserDTO';
import {CreatePlayerRequestDTO} from './CreatePlayerRequestDTO';
import {CreatePlayerResponseDTO} from './CreatePlayerResponseDTO';
import {CreatePlayerErrors} from './CreatePlayerErrors';
import {CreatePlayerErrorResponseDTO} from './CreatePlayerErrorResponseDTO';
import {CreatePlayerService} from './CreatePlayerService';
import {PlayerMapper} from '../../mappers/PlayerMapper';
import {UserMapper} from '../../../user/mappers/UserMapper';
import {GetTileForNewCityService} from '../getTileForNewCity/GetTileForNewCityService';
import {CreateCityService} from '../createCity/CreateCityService';
import {CityFactory} from '../../factories/CityFactory';
import {log} from '../../../../shared/utils/log';
import {Player} from '../../domain/Player';
import {User} from '../../../user/domain/User';
import {Tile} from '../../domain/Tile';
import {City} from '../../domain/City';
import {Resources} from '../../domain/Resources';
import {ResourcesFactory} from '../../factories/ResourcesFactory';
import {CreateResourcesForPlayerService} from '../createResourcesForPlayer/CreateResourcesForPlayerService';
import {CreateArmyForPlayerService} from '../createArmyForPlayer/CreateArmyForPlayerService';
import {createArmyForPlayerService} from '../createArmyForPlayer';
import {Army} from '../../domain/Army';
import {ArmyFactory} from '../../factories/ArmyFactory';
import {ArmyUnitsFactory} from '../../factories/ArmyUnitsFactory';
import {ArmyUnits} from '../../domain/ArmyUnits';
import {CityMapper} from '../../mappers/CityMapper';
import {ArmyMapper} from '../../mappers/ArmyMapper';
import {ResourcesMapper} from '../../mappers/ResourcesMapper';

/**
 *
 *
 * @export
 * @class CreatePlayerController
 * @extends {BaseServices}
 */
export class CreatePlayerController {
  private createPlayerService: CreatePlayerService;
  private getTileForNewCityService: GetTileForNewCityService;
  private createCityService: CreateCityService;
  private createResourcesForPlayerService: CreateResourcesForPlayerService;
  private createArmyForPlayerService: CreateArmyForPlayerService;
  private armyFactory: ArmyFactory;
  private armyUnitsFactory: ArmyUnitsFactory;
  private cityFactory: CityFactory;
  private resourcesFactory: ResourcesFactory;
  private playerMapper: PlayerMapper;
  private userMapper: UserMapper;
  private cityMapper: CityMapper;
  private armyMapper: ArmyMapper;
  private resourcesMapper: ResourcesMapper;

  /**
   * Creates an instance of CreatePlayerController.
   *
   * @param {CreatePlayerService} createPlayerService
   * @param {GetTileForNewCityService} getTileForNewCityService
   * @param {CreateCityService} createCityService
   * @param {CreateResourcesForPlayerService} createResourcesForPlayerService
   * @param {CreateArmyForPlayerService} createArmyForPlayerService
   * @memberof PlayerServices
   */
  constructor(
      createPlayerService: CreatePlayerService,
      getTileForNewCityService: GetTileForNewCityService,
      createCityService: CreateCityService,
      createResourcesForPlayerService: CreateResourcesForPlayerService,
      createArmyForPlayerService: CreateArmyForPlayerService,
  ) {
    this.createPlayerService = createPlayerService;
    this.getTileForNewCityService = getTileForNewCityService;
    this.createCityService = createCityService;
    this.createResourcesForPlayerService = createResourcesForPlayerService;
    this.createArmyForPlayerService = createArmyForPlayerService;
    this.armyFactory = new ArmyFactory();
    this.armyUnitsFactory = new ArmyUnitsFactory();
    this.cityFactory = new CityFactory();
    this.resourcesFactory = new ResourcesFactory();
    this.playerMapper = new PlayerMapper();
    this.userMapper = new UserMapper();
    this.cityMapper = new CityMapper();
    this.armyMapper = new ArmyMapper();
    this.resourcesMapper = new ResourcesMapper();
  }

  /**
   * This method accepts a `CreatePlayerRequestDTO`, maps the incoming DTO to
   * a domain model, and calls the appropriate services to fulfill the
   * request.
   *
   * @param {UserDTO} userDTO
   * @param {CreatePlayerRequestDTO} incomingDTO
   * @return {Promise<CreatePlayerResponseDTO | CreatePlayerErrorResponseDTO>}
   * @memberof PlayerServices
   */
  async createPlayer(
      userDTO: UserDTO,
      incomingDTO: CreatePlayerRequestDTO,
  ): Promise<CreatePlayerResponseDTO | CreatePlayerErrorResponseDTO> {
    try {
      // start transaction
      // 1. create player
      const user: User = this.userMapper.fromDTO(userDTO);
      const player: Player = this.playerMapper.fromDTO(incomingDTO.$player);
      const createdPlayer: Player = await this.createPlayerService.createPlayer(
          user,
          player,
      );

      // 2. get tile for new city
      const tile: Tile = await this.getTileForNewCityService.getTile();

      // 3. create new city for player
      const defaultCity: City = this.cityFactory.createDefaultCity(player);
      const createdCity: City = await this.createCityService.createCity(
          createdPlayer,
          defaultCity,
          tile,
      );

      // 4. give starting resources to player
      const defaultResources: Resources = this.resourcesFactory
          .createDefaultResources();
      const createdResources: Resources = await this.createResourcesForPlayerService
          .createResources(createdPlayer, defaultResources);

      // 5. give starting army to player
      const defaultArmy: Army = this.armyFactory.createDefaultArmyWithUnits();
      const createdArmy: Army = await this.createArmyForPlayerService.createArmyWithUnits(
          createdPlayer,
          defaultArmy,
          defaultArmy.$units,
      );
      // rollback transaction if there is an error

      // convert domain entities to dtos
      const createdPlayerDTO = this.playerMapper.toDTO(createdPlayer);
      const createdCityDTO = this.cityMapper.toDTO(createdCity);
      const createdArmyDTO = this.armyMapper.toDTO(createdArmy);
      const createdResourcesDTO = this.resourcesMapper.toDTO(createdResources);
      // create response dto from results
      return new CreatePlayerResponseDTO(
          createdPlayerDTO,
          createdCityDTO,
          createdArmyDTO,
          createdResourcesDTO,
      );
    } catch (err) {
      // check error message and throw appropriate error for caller to handle
      switch (err.message) {
        case CreatePlayerErrors.DuplicatePlayername:
          throw err;
        case CreatePlayerErrors.NonexistentUser:
          throw err;
        default:
          log.error('Unknown error in CreatePlayerController', err.stack);
          throw new Error(CreatePlayerErrors.UnknownError);
      }
    }
  }
}
