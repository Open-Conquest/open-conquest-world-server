/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {Tile} from './Tile';
import {Mapname} from './Mapname';

/**
 * Map entity representing the world's map.
 *
 * @export
 * @class Map
 * @extends {Entity}
 */
export class Map extends Entity {
  private tiles: Array<Array<Tile>>;
  private name: Mapname;
  private maxRows: number;
  private maxCols: number;

  constructor($id: EntityID, $name: Mapname, $tiles: Array<Array<Tile>>, $maxRows: number, $maxCols: number) {
    super($id);
    this.name = $name;
    this.tiles = $tiles;
    this.maxRows = $maxRows;
    this.maxCols = $maxCols;
  }

  public get $tiles(): Array<Array<Tile>> {
    return this.tiles;
  }

  public set $tiles(value: Array<Array<Tile>>) {
    this.tiles = value;
  }

  public get $name(): Mapname {
    return this.name;
  }

  public set $name(value: Mapname) {
    this.name = value;
  }

  public get $maxRows(): number {
    return this.maxRows;
  }

  public get $maxCols(): number {
    return this.maxCols;
  }

  public set $maxRows(value: number) {
    this.maxRows = value;
  }

  public set $maxCols(value: number) {
    this.maxCols = value;
  }
}
