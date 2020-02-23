/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {MessageDTO} from '../../../../../../src/shared/dtos/MessageDTO';
import {ServiceOperations} from '../../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {ServiceNames} from '../../../../../../src/shared/infra/ws/routing/ServiceNames';
import {models} from '../../../../../../src/shared/infra/sequelize/models';
import {log} from '../../../../../../src/shared/utils/log';

// what is being tested
import {worldRouter} from '../../../../../../src/shared/infra/ws/routing/';
import { JWTDTO } from '../../../../../../src/shared/dtos/JWTDTO';

/**
 * Test for WorldRouter's handle method. Ensure that handle dispatches messages
 * to the expected services. Also ensure that expected errors occur when they
 * are expected.
 */
describe('WorldRouter:handle', function() {
  const assert = chai.assert;

  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('should dispatch an expected message to the expected endpoints', async function() {
    const message = new MessageDTO();
    message.$operation = ServiceOperations.CreatePlayer;
    message.$service = ServiceNames.Player;
    message.$token = new JWTDTO('asdfkladsflaskdf');
    message.$data = null;

    log.info(message);
    const response = await worldRouter.handle(message.toJSON());
    log.info(message);

    assert.fail(message);
  });
});
