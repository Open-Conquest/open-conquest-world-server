/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface CreatePlayerResponse {
  player: Player;
  city: City;
  army: Army;
  resources: Resources;
}
export interface Player {
  playerID?: number;
  name: string;
}
export interface City {
  name: string;
  level: number;
  row: number;
  col: number;
}
export interface Army {
  units: ArmyUnits[];
}
export interface ArmyUnits {
  count: number;
  unit: Unit;
}
export interface Unit {
  type: number;
  name: string;
  attack: number;
  defense: number;
  goldCost: number;
}
export interface Resources {
  gold: number;
}
