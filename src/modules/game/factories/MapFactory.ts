/* eslint-disable require-jsdoc */
import {EntityID} from '../../../shared/domain/EntityID';
import {Map} from '../domain/Map';
import {Mapname} from '../domain/Mapname';

/**
 * This class is meant to handle the construction of `Map` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Map.
 *
 * @class MapFactory
 */
export class MapFactory {
  /**
   * Creates an instance of MapFactory.
   * @memberof MapFactory
   */
  constructor() {}

  createMap(id: number, name: string, maxRows: number, maxCols: number): Map {
    return new Map(
        new EntityID(id),
        new Mapname(name),
        null,
        maxRows,
        maxCols,
    );
  }
}
