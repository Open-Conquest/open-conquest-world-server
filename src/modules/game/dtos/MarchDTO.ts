/* eslint-disable require-jsdoc */
import {March} from '../../../shared/schemas/March';
import {ArmyDTO} from './ArmyDTO';
import {PlayerDTO} from './PlayerDTO';

/**
 * DTO representation of March schema.
 *
 * @class MarchDTO
 * @implements {March}
 */
export class MarchDTO implements March {
  marchID: number;
  army: ArmyDTO;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  startTime: string;

  constructor(
      marchID: number,
      army: ArmyDTO,
      startRow: number,
      startCol: number,
      endRow: number,
      endCol: number,
      startTime: string,
  ) {
    this.marchID = marchID;
    this.army = army;
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.startTime = startTime;
  }

  static fromJSON(json: any): MarchDTO {
    const army = ArmyDTO.fromJSON(json['army']);
    return new MarchDTO(
        json['marchID'],
        army,
        json['startRow'],
        json['startCol'],
        json['endRow'],
        json['endCol'],
        json['startTime'],
    );
  }

  public get $marchID(): number {
    return this.marchID;
  }

  public get $army(): ArmyDTO {
    return this.army;
  }

  public get $startRow(): number {
    return this.startRow;
  }

  public get $startCol(): number {
    return this.startCol;
  }

  public get $endRow(): number {
    return this.endRow;
  }

  public get $endCol(): number {
    return this.endCol;
  }

  public get $startTime(): string {
    return this.startTime;
  }

  public set $marchID(value: number) {
    this.marchID = value;
  }

  public set $army(value: ArmyDTO) {
    this.army = value;
  }

  public set $startRow(value: number) {
    this.startRow = value;
  }

  public set $startCol(value: number) {
    this.startCol = value;
  }

  public set $endRow(value: number) {
    this.endRow = value;
  }

  public set $endCol(value: number) {
    this.endCol = value;
  }

  public set $startTime(value: string) {
    this.startTime = value;
  }
}
