import {City} from '../domain/City';
import { Player } from '../domain/Player';

export interface ICityRepository {
  createCity(player: Player, city: City): Promise<City>
  getCity(city: City): Promise<City>
  getAllCities(city: City): Promise<Array<City>>
}
