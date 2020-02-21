/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../../src/shared/log';
import {models} from '../../../../../../src/models/';
import {registerUserController} from '../../../../../../src/modules/user/services/registerUser/';

/**
 * These are the integration tests for RegisterUserController
 */
describe('RegisterUserController', function() {
  const assert = chai.assert;

  /**
   * Start a transaction before each test then rollback any changes after
   * the test finishes running. This ensure that no changes made to the
   * database during the tests are kept.
   */
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  /**
   * Test all expected successful cases for registering a user.
   */
});
