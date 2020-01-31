import {Map} from '../domain/Map';

export interface IMapRepository {
  getMap(): Promise<Map>
}
