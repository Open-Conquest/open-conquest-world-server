import {Map} from '../domain/Map';

export interface IMapRepository {
  getAllMaps(): Promise<Array<Map>>
}
