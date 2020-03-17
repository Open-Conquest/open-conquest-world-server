/* eslint-disable require-jsdoc */
import {Tile, TileType} from '../../../shared/schemas/Tile';

export class TileDTO implements Tile {
  type: number;
  row: number;
  col: number;

  constructor(type: number, row: number, col: number) {
    this.type = type;
    this.row = row;
    this.col = col;
  }

  public get $type(): number {
    return this.type;
  }

  public get $row(): number {
    return this.row;
  }

  public get $col(): number {
    return this.col;
  }

  public set $type(value: number) {
    this.type = value;
  }

  public set $row(value: number) {
    this.row = value;
  }

  public set $col(value: number) {
    this.col = value;
  }
}
