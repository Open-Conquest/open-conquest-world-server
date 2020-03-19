/* eslint-disable require-jsdoc */
import {Map} from '../../../shared/schemas/Map';
import {TileDTO} from './TileDTO';

export class MapDTO implements Map {
  tiles: Array<Array<TileDTO>>;

  constructor(tiles: Array<Array<TileDTO>>) {
    this.tiles = tiles;
  }

  public get $tiles(): Array<Array<TileDTO>> {
    return this.tiles;
  }

  public set $tiles(value: Array<Array<TileDTO>>) {
    this.tiles = value;
  }
}
