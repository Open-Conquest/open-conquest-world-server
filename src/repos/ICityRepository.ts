import {City} from '../domain/City';

export interface ICityRepository {
  getCity(): Promise<City>
}