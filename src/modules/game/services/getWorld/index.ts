import {GetWorldService} from './GetWorldService';
import {
  playerRepository,
  cityRepository,
  mapRepository,
  tileRepository,
} from '../../repos/implementations';
import {GetWorldController} from './GetWorldController';

const getWorldService = new GetWorldService(
    playerRepository,
    cityRepository,
    mapRepository,
    tileRepository,
);

const getWorldController = new GetWorldController(getWorldService);

export {getWorldService, getWorldController};
