import {City} from '../domain/City';

export interface ICityRepository {
  getAllCities(): Promise<Array<City>>
}