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

    log.info('Mapping dbMarch', dbMarch);

    // map march army
    const army = this.armyMapper.fromPersistence(dbMarch.army);

    // map march start time
    const startTime = new Time();

    return this.marchFactory.createMarch(
        dbMarch.march_id,
        army,
        dbMarch.start_row,
        dbMarch.start_col,
        dbMarch.end_row,
        dbMarch.end_col,
        startTime,
    );
  }
}
