/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {Map} from './Map';
import {Player} from './Player';
import {City} from './City';
import {March} from './March';

/**
 * World entity that represents the entire world.
 *
 * @export
 * @class World
 * @extends {Entity}
 */
export class World extends Entity {
  private map: Map;
  private players: Array<Player>;
  private cities: Array<City>;
  private marches: Array<March>;

  /**
   * Creates an instance of World.
   * @param {EntityID} id
   * @param {Map} map
   * @param {Array<Player>} players
   * @param {Array<City>} cities
   * @param {Array<March>} marches
   * @memberof World
   */
  constructor(
      id: EntityID,
      map: Map,
      players: Array<Player>,
      cities: Array<City>,
      marches: Array<March>,
  ) {
    super(id);
    this.map = map;
    this.players = players;
    this.cities = cities;
    this.marches = marches;
  }

  public get $map(): Map {
    return this.map;
  }

  public get $players(): Array<Player> {
    return this.players;
  }

  public get $cities(): Array<City> {
    return this.cities;
  }

  public set $map(value: Map) {
    this.map = value;
  }

  public set $players(value: Array<Player>) {
    this.players = value;
  }

  public set $cities(value: Array<City>) {
    this.cities = value;
  }

  public get $marches(): Array<March> {
    return this.marches;
  }

  public set $marches(value: Array<March>) {
    this.marches = value;
  }
}
