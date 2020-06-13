import {World} from '../../domain/World';
import {IPlayerRepository} from '../../repos/IPlayerRepository';
import {ICityRepository} from '../../repos/ICityRepository';
import {IMapRepository} from '../../repos/IMapRepository';
import {WorldFactory} from '../../factories/WorldFactory';
import {ITileRepository} from '../../repos/ITileRepository';
import {EntityID} from '../../../../shared/domain/EntityID';
import {IMarchRepository} from '../../repos/IMarchRepository';

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
  private marchRepository: IMarchRepository;
  private tileRepository: ITileRepository;
  private worldFactory: WorldFactory;

  /**
   * Creates an instance of GetWorldService.
   *
   * @param {IPlayerRepository} playerRepository
   * @param {ICityRepository} cityRepository
   * @param {IMapRepository} mapRepository
   * @param {IMarchRepository} marchRepository
   * @param {ITileRepository} tileRepository
   * @memberof GetWorldService
   */
  constructor(
      playerRepository: IPlayerRepository,
      cityRepository: ICityRepository,
      mapRepository: IMapRepository,
      marchRepository: IMarchRepository,
      tileRepository: ITileRepository,
  ) {
    this.playerRepository = playerRepository;
    this.cityRepository = cityRepository;
    this.marchRepository = marchRepository;
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
    // get all the players in the world
    const players = await this.playerRepository.getAllPlayers();

    // get the world's map & all its tiles
    const map = await this.mapRepository.getMap();
    map.$tiles = await this.tileRepository.getAllTiles(map);

    // get all the cities in the world
    const cities = await this.cityRepository.getAllCities();

    // get all the marches in the world
    const marches = await this.marchRepository.getAllMarches();

    // return the world entity
    return this.worldFactory.createWorld(
        new EntityID(1),
        players,
        map,
        cities,
        marches,
    );
  }
}
