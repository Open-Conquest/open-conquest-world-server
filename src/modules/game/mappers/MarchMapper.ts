import {March} from '../domain/March';
import {MarchFactory} from '../factories/MarchFactory';
import {ArmyMapper} from './ArmyMapper';
import {Time} from '../domain/Time';
import {log} from '../../../shared/utils/log';
import {MarchDTO} from '../dtos/MarchDTO';

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

  /**
   * Maps a March to a MarchDTO.
   *
   * @param {March} march
   * @return {MarchDTO}
   * @memberof MarchMapper
   */
  toDTO(march: March): MarchDTO {
    if (march === null) {
      return null;
    }

    const armyDTO = this.armyMapper.toDTO(march.$army);
    return new MarchDTO(
        march.$id.$value,
        armyDTO,
        march.$startRow,
        march.$startCol,
        march.$endRow,
        march.$endCol,
        march.$startTime.$value,
    );
  }

  /**
   * Maps a MarchDTO to a March.
   *
   * @param {MarchDTO} marchDTO
   * @return {March}
   * @memberof MarchMapper
   */
  fromDTO(marchDTO: MarchDTO): March {
    if (marchDTO === null) {
      return null;
    }

    const army = this.armyMapper.fromDTO(marchDTO.$army);
    const time = new Time(marchDTO.$startTime);
    return this.marchFactory.createMarch(
        marchDTO.$marchID,
        army,
        marchDTO.$startRow,
        marchDTO.$startCol,
        marchDTO.$endRow,
        marchDTO.$endCol,
        time,
    );
  }
}
