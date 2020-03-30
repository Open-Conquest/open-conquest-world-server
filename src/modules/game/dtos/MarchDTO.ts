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
  army: ArmyDTO;
  player: PlayerDTO;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  startTime: string;

  constructor(
      army: ArmyDTO,
      player: PlayerDTO,
      startRow: number,
      startCol: number,
      endRow: number,
      endCol: number,
      startTime: string,
  ) {
    this.army = army;
    this.player = player;
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.startTime = startTime;
  }

  public get $army(): ArmyDTO {
    return this.army;
  }

  public get $player(): PlayerDTO {
    return this.player;
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

  public set $army(value: ArmyDTO) {
    this.army = value;
  }

  public set $player(value: PlayerDTO) {
    this.player = value;
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
