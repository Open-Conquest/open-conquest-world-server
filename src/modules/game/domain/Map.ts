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

  constructor($id: EntityID, $name: Mapname, $tiles: Array<Array<Tile>>) {
    super($id);
    this.name = $name;
    this.tiles = $tiles;
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
}
