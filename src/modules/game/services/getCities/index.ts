import {cityRepository} from '../../repos/implementations';
import { GetCitiesController } from './GetCitiesController';
import { doesPlayerBelongToUserService } from '../doesPlayerBelongToUser';
import { GetCitiesService } from './GetCitiesService';

const getCitiesService = new GetCitiesService(cityRepository);
const getCitiesController = new GetCitiesController(getCitiesService, doesPlayerBelongToUserService)

export {getCitiesService, getCitiesController};
