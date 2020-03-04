import {Resources} from '../domain/Resources';
import {ResourcesFactory} from '../factories/ResourcesFactory';
// import {ResourcesDTO} from '../dtos/ResourcesDTO';

/**
 * ResourcesMapper is responsible for mappings between the domain `Resources`
 * and the persistence (sequelize) representation of a resources.
 */
export class ResourcesMapper {
  private resourcesFactory: ResourcesFactory

  /** Creates an instance of ResourcesMapper. */
  constructor() {
    this.resourcesFactory = new ResourcesFactory();
  }

  /**
   * Create a domain entity `Resources` from a sequelize object.
   *
   * @param {*} dbResources
   * @return {Resources}
   * @memberof ResourcesMapper
   */
  fromPersistence(dbResources: any): Resources {
    if (dbResources === null) {
      return null;
    }

    return this.resourcesFactory.createResources(
        dbResources.resources_id,
        dbResources.gold,
    );
  }
}
