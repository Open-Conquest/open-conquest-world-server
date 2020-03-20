import {March} from '../domain/March';
import {MarchFactory} from '../factories/MarchFactory';
import {ArmyMapper} from './ArmyMapper';
import {Time} from '../domain/Time';
import {log} from '../../../shared/utils/log';
// import {MarchDTO} from '../dtos/MarchDTO';

/**
 * MarchMapper is responsible for mappings between the domain march entity
 * and the persistence (sequelize) representation of a march.
 */
export class MarchMapper {
  private marchFactory: MarchFactory
  private armyMapper: ArmyMapper;

  /** Creates an instance of MarchMapper. */
  constructor() {
    this.marchFactory = new MarchFactory();
    this.armyMapper = new ArmyMapper();
  }

  /**
   * Create a domain entity `March` from a sequelize object.
   *
   * @param {*} dbMarch
   * @return {March}
   * @memberof MarchMarchper
   */
  fromPersistence(dbMarch: any): March {
    if (dbMarch === null) {
      return null;
    }

    return this.marchFactory.createMarch(
        dbMarch.march_id,
        this.armyMapper.fromPersistence(dbMarch.army),
        dbMarch.startTile.tile_row,
        dbMarch.startTile.tile_col,
        dbMarch.endTile.tile_row,
        dbMarch.endTile.tile_col,
        new Time(dbMarch.start_time),
    );
  }
}
