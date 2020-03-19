/* eslint-disable require-jsdoc */
import {March} from '../domain/March';
import {EntityID} from '../../../shared/domain/EntityID';
import {Time} from '../domain/Time';
import {Army} from '../domain/Army';

/**
 * This class is meant to handle the construction of `March` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of March.
 *
 * @class MarchFactory
 */
export class MarchFactory {
  /**
   * Creates an instance of MarchFactory.
   * @memberof MarchFactory
   */
  constructor() {}

  createMarch(
      id: number,
      army: Army,
      startRow: number,
      startCol: number,
      endRow: number,
      endCol: number,
      startTime: Time,
  ): March {
    return new March(
        new EntityID(id),
        army,
        startRow,
        startCol,
        endRow,
        endCol,
        startTime,
    );
  }
}
