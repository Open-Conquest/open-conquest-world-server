/* eslint-disable require-jsdoc */
import {IResourcesRepository} from '../IResourcesRepository';
import {Resources} from '../../domain/Resources';
import {Player} from '../../domain/Player';
import {ResourcesMapper} from '../../mappers/ResourcesMapper';
import {ResourcesRepositoryErrors} from '../ResourcesRepositoryErrors';
import {log} from '../../../../shared/utils/log';

/**
 * Repository implementation for resources entities.
 *
 * @export
 * @class ResourcesRepository
 * @implements {IResourcesRepository}
 */
export class ResourcesRepository implements IResourcesRepository {
  private models: any;
  private resourcesMapper: ResourcesMapper;

  /**
   * Creates an instance of ResourcesRepository.
   *
   * @param {*} models
   * @memberof ResourcesRepository
   */
  constructor(models: any) {
    this.models = models;
    this.resourcesMapper = new ResourcesMapper();
  }

  /**
   * Create a new resources in the database for player.
   *
   * @param {Player} player
   * @param {Resources} resources
   * @return {Promise<Resources>}
   * @memberof ResourcesRepository
   */
  async createResources(player: Player, resources: Resources): Promise<Resources> {
    try {
      const dbResources = await this.models.resources.create({
        player_id: player.$id.$value,
        gold: resources.$gold,
      });
      // map from db to domain and return
      return this.resourcesMapper.fromPersistence(dbResources);
    } catch (err) {
      // check to see what type of error was returned
      switch (err.name) {
        case 'SequelizeForeignKeyConstraintError':
          switch (err.table) {
            case 'player':
              throw new Error(ResourcesRepositoryErrors.NonexistentPlayer);
          }
        default:
          throw err;
      }
    }
  }

  // async getResources(resources: Resources): Promise<Resources> {
  //   const dbResources = await this.models.resources.findOne({
  //     where: {
  //       resources_name: resources.$name.$value,
  //     },
  //   });
  //   return this.resourcesMapper.fromPersistence(dbResources);
  // }
}
