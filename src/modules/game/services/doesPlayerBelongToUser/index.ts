import {playerRepository} from '../../repos/implementations';
import {DoesPlayerBelongToUserService} from './DoesPlayerBelongToUserService';

const doesPlayerBelongToUserService = new DoesPlayerBelongToUserService(
    playerRepository,
);

export {doesPlayerBelongToUserService};
