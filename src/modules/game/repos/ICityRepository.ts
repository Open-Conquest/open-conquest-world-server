import {City} from '../domain/City';

export interface ICityRepository {
  createCity(city: City): Promise<City>
  getCity(city: City): Promise<City>
  getAllCities(city: City): Promise<Array<City>>
}
