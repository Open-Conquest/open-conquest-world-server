import {Tile} from '../domain/Tile';

export interface ITileRepository {
  getAllTiles(): Promise<Array<Tile>>
  getTile(row: number, col: number)
}
