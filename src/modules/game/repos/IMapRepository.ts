import {Map} from '../domain/Map';

export interface IMapRepository {
  createMap(map: Map): Promise<Map>;
}
