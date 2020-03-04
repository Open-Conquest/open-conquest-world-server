import {CreateResourcesForPlayerService} from './CreateResourcesForPlayerService';
import {resourcesRepository} from '../../repos/implementations';

const createResourcesForPlayerService = new CreateResourcesForPlayerService(
    resourcesRepository,
);

export {createResourcesForPlayerService};
