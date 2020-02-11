import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/utils/log';
import {ArmyUnits, UnitType} from '../../../src/domain/ArmyUnits';
import {Army} from '../../../src/domain/Army';
import {EntityId} from '../../../src/domain/Entity';
import {User} from '../../../src/domain/User';
import { armyServices } from '../../../src/services';
import { armyRepository, userRepository } from '../../../src/repos/implementations';
import { Response } from '../../../src/Response';
import { ServiceNames } from '../../../src/services/ServiceNames';
import { ServiceOperations } from '../../../src/services/ServiceOperations';

describe('ArmyServices', function() {
  it('should return expected GetArmiesResponse for a user with a single army', async function() {
    throw new Error('no impl');
  });

  it('should return expected GetArmiesResponse for a user with multiple armies', async function() {
    throw new Error('no impl');
  });
});
