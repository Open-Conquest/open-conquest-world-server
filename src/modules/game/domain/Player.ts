/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {Playername} from './Playername';
import {City} from './City';
import {Army} from './Army';
import {March} from './March';
import {Resources} from './Resources';

/**
 * Domain entity representation of a Player.
 *
 * @export
 * @class Player
 */
export class Player extends Entity {
  private name: Playername;
  private resources: Resources;
  private city: City;
  private army: Army;
  private marches: Array<March>;
  private armies: Array<Army>;

  constructor(id: EntityID, name: Playername) {
    super(id);
    this.name = name;
  }

  getNameString(): string {
    return this.name.getString();
  }

  public get $name(): Playername {
    return this.name;
  }

  public set $name(value: Playername) {
    this.name = value;
  }

  public get $city(): City {
    return this.city;
  }

  public get $armies(): Array<Army> {
    return this.armies;
  }

  public set $city(value: City) {
    this.city = value;
  }

  public set $armies(value: Array<Army>) {
    this.armies = value;
  }

  public get $army(): Army {
    return this.army;
  }

  public get $marches(): Array<March> {
    return this.marches;
  }

  public set $army(value: Army) {
    this.army = value;
  }

  public set $marches(value: Array<March>) {
    this.marches = value;
  }

  public get $resources(): Resources {
    return this.resources;
  }

  public set $resources(value: Resources) {
    this.resources = value;
  }
}
