import {World} from '../../domain/World';
import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {ICityRepository} from '../../repos/ICityRepository';
import {IMapRepository} from '../../repos/IMapRepository';
import {WorldFactory} from '../../factories/WorldFactory';
import {ITileRepository} from '../../repos/ITileRepository';

/**
 * Service for handling get world
 *
 * @export
 * @class GetWorldService
 */
export class GetWorldService {
  // private worldRepository: IWorldRepository;
  private playerRepository: IPlayerRepository;
  private cityRepository: ICityRepository;
  private mapRepository: IMapRepository;
  private tileRepository: ITileRepository;
  private worldFactory: WorldFactory;

  /**
   * Creates an instance of GetWorldService.
   *
   * @param {IPlayerRepository} playerRepository
   * @param {ICityRepository} cityRepository
   * @param {IMapRepository} mapRepository
   * @param {ITileRepository} tileRepository
   * @memberof GetWorldService
   */
  constructor(
      playerRepository: IPlayerRepository,
      cityRepository: ICityRepository,
      mapRepository: IMapRepository,
      tileRepository: ITileRepository,
  ) {
    this.playerRepository = playerRepository;
    this.cityRepository = cityRepository;
    this.mapRepository = mapRepository;
    this.tileRepository = tileRepository;
    this.worldFactory = new WorldFactory();
  }

  /**
   * Returns a domain entity for this world.
   *
   * @return {Promise<World>}
   * @memberof GetWorldService
   */
  async getWorld(): Promise<World> {
    const players = await this.playerRepository.getAllPlayers();
    const map = await this.mapRepository.getMap();
    map.$tiles = await this.tileRepository.getAllTiles(map);
    const cities = await this.cityRepository.getAllCities();

    return this.worldFactory.createWorld(1, players, map, cities);
  }
}
