/* eslint-disable require-jsdoc */
import {Unit} from '../../../shared/schemas/Unit';

/**
 * DTO representation of Unit schema.
 *
 * @class UnitDTO
 * @implements {Unit}
 */
export class UnitDTO implements Unit {
  type: number;
  name: string;
  attack: number;
  defense: number;
  goldCost: number;

  constructor(type: number, name: string, attack: number, defense: number, goldCost: number) {
    this.type = type;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.goldCost = goldCost;
  }

  public get $type(): number {
    return this.type;
  }

  public get $name(): string {
    return this.name;
  }

  public get $attack(): number {
    return this.attack;
  }

  public get $defense(): number {
    return this.defense;
  }

  public get $goldCost(): number {
    return this.goldCost;
  }

  public set $type(value: number) {
    this.type = value;
  }

  public set $name(value: string) {
    this.name = value;
  }

  public set $attack(value: number) {
    this.attack = value;
  }

  public set $defense(value: number) {
    this.defense = value;
  }

  public set $goldCost(value: number) {
    this.goldCost = value;
  }
}
