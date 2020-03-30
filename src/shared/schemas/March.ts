/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface March {
  marchID?: number;
  army: Army;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  startTime: string;
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
