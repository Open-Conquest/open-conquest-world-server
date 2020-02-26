/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {TileType} from './TileType';

export class Tile extends Entity {
  private mapID: EntityID;
  private row: number;
  private col: number;
  private type: TileType;

  constructor($id: EntityID, $mapID: EntityID, $row: number, $col: number, $type: TileType) {
    super($id);
    this.mapID = $mapID;
    this.row = $row;
    this.col = $col;
    this.type = $type;
  }

  public get $mapID(): EntityID {
    return this.mapID;
  }

  public set $mapID(value: EntityID) {
    this.mapID = value;
  }

  public get $row(): number {
    return this.row;
  }

  public get $col(): number {
    return this.col;
  }

  public get $type(): TileType {
    return this.type;
  }

  public set $row(value: number) {
    this.row = value;
  }

  public set $col(value: number) {
    this.col = value;
  }

  public set $type(value: TileType) {
    this.type = value;
  }
}
