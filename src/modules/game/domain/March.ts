/* eslint-disable require-jsdoc */
import {Entity} from '../../../shared/domain/Entity';
import {EntityID} from '../../../shared/domain/EntityID';
import {Army} from './Army';
import {Time} from './Time';

/**
 * Domain entity representation of a March.
 *
 * @export
 * @class March
 */
export class March extends Entity {
  private army: Army;
  private startRow: number;
  private startCol: number;
  private endRow: number;
  private endCol: number;
  private startTime: Time;
  private endTime: Time;

  constructor(
      id: EntityID,
      army: Army,
      startRow: number,
      startCol: number,
      endRow: number,
      endCol: number,
      startTime: Time,
  ) {
    super(id);
    this.army = army;
    this.startRow = startRow;
    this.startCol = startCol;
    this.endRow = endRow;
    this.endCol = endCol;
    this.startTime = startTime;
  }

  getDistance(): number {
    const rowDiff = this.startRow - this.endRow;
    const colDiff = this.startCol - this.endCol;
    return Math.floor(Math.sqrt(rowDiff*rowDiff + colDiff*colDiff));
  }

  public get $army(): Army {
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

  public get $startTime(): Time {
    return this.startTime;
  }

  public get $endTime(): Time {
    return this.endTime;
  }

  public set $army(value: Army) {
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

  public set $startTime(value: Time) {
    this.startTime = value;
  }

  public set $endTime(value: Time) {
    this.endTime = value;
  }
}
