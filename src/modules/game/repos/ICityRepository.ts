import {City} from '../domain/City';
import {Player} from '../domain/Player';
import {Tile} from '../domain/Tile';

export interface ICityRepository {
  createCity(player: Player, city: City, tile: Tile): Promise<City>
  getCity(city: City): Promise<City>
  getAllCities(): Promise<Array<City>>
}
