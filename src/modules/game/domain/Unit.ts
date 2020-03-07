/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';

/** Enum representing the different unit types */
export enum UnitType {
  Wizard = 0,
  Bear = 1 
}

/** Enum representing the different unit types' names */
export enum UnitName {
  Wizard = 'Wizard',
  Bear = 'Bear'
}

/** Enum representing the different unit types' attack */
export enum UnitAttack {
  Wizard = 100,
  Bear = 50
}

/** Enum representing the different unit types' defense */
export enum UnitDefense {
  Wizard = 50,
  Bear = 150
}

/** Enum representing the different unit types' gold cost */
export enum UnitGoldCost {
  Wizard = 100,
  Bear = 150
}

/**
 * Domain representation of an army unit type.
 *
 * @export
 * @class Unit
 */
export class Unit {
  private type: UnitType;
  private name: UnitName;
  private attack: UnitAttack;
  private defense: UnitDefense;
  private goldCost: UnitGoldCost;
  /**
   * Create an instance of a armyunits entity.
   *
   * @param {UnitType} type
   * @param {UnitName} name
   * @param {UnitAttack} attack
   * @param {UnitDefense} defense
   * @param {UnitGoldCost} goldCost
   * @memberof Units
   */
  constructor(type: UnitType, name: UnitName, attack: UnitAttack, defense: UnitDefense, goldCost: UnitGoldCost) {
    this.type = type;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.goldCost = goldCost;
  }

  public get $type(): UnitType {
    return this.type;
  }

  public get $name(): UnitName {
    return this.name;
  }

  public get $attack(): UnitAttack {
    return this.attack;
  }

  public get $defense(): UnitDefense {
    return this.defense;
  }

  public get $goldCost(): UnitGoldCost {
    return this.goldCost;
  }

  public set $type(value: UnitType) {
    this.type = value;
  }

  public set $name(value: UnitName) {
    this.name = value;
  }

  public set $attack(value: UnitAttack) {
    this.attack = value;
  }

  public set $defense(value: UnitDefense) {
    this.defense = value;
  }
  public set $goldCost(value: UnitGoldCost) {
    this.goldCost = value;
  }
}
