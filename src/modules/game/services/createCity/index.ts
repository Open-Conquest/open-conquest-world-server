import {CreateCityService} from './CreateCityService';
import {cityRepository} from '../../repos/implementations/';

const createCityService = new CreateCityService(cityRepository);

export {createCityService};
