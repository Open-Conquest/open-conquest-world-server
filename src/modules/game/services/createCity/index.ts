import {CreateCityService} from './CreateCityService';
import {cityRepository} from '../../repos/implementations/';
import {tileRepository} from '../../repos/implementations/';

const createCityService = new CreateCityService(cityRepository, tileRepository);

export {createCityService};
