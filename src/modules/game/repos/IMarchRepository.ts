import {March} from '../domain/March';
import {Tile} from '../domain/Tile';

export interface IMarchRepository {
  createMarch(march: March, start: Tile, end: Tile): Promise<March>;
  getAllMarches(): Promise<Array<March>>;
}
