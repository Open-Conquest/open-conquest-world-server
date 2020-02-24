/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../../../src/shared/utils/log';
import {models} from '../../../../../src/shared/infra/sequelize/models';
import {ServiceNames} from '../../../../../src/shared/infra/ws/routing/ServiceNames';
import {ServiceOperations} from '../../../../../src/shared/infra/ws/routing/ServiceOperations';
import {MessageDTO} from '../../../../../src/shared/dtos/MessageDTO';
import {UserCredentialsDTO} from '../../../../../src/modules/user/dtos/UserCredentialsDTO';
import {RegisterUserRequestDTO} from '../../../../../src/modules/user/services/registerUser/RegisterUserRequestDTO';
import {RegisterUserResponseDTO} from '../../../../../src/modules/user/services/registerUser/RegisterUserResponseDTO';
import {JWT} from '../../../../../src/modules/user/domain/JWT';

import {userEndpoints} from '../../../../../src/modules/user/endpoints';
import {playerEndpoints} from '../../../../../src/modules/game/endpoints';

/**
 * Summary of tests for CreatePlayerController:createPlayer
 * 1. Should get a DTO with a new player & their city, resources, and army
 */

describe('PlayerEndpoints:createPlayer', function() {
  const assert = chai.assert;

  /**
   * Start a transaction before each test then rollback any changes after
   * the test finishes running. This ensures that no changes made to the
   * database during the tests are kept.
   */
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  // 1. Should get a DTO with a new player & their city, resources, and army
  it('Should get a DTO with a new player & their city, resources, and army', async function() {
    assert.fail('not finished');

    // register a new user
    // const creds = new UserCredentialsDTO(
    //     'test_username',
    //     'test_password',
    // );
    // const data = new RegisterUserRequestDTO(
    //     creds,
    // );
    // const registerMessage = new MessageDTO();
    // registerMessage.$service = ServiceNames.User;
    // registerMessage.$operation = ServiceOperations.RegisterUser;
    // registerMessage.$data = data;

    // const registerResponse = await userEndpoints.registerUser(registerMessage);
    // // create register response dto from generic message dto
    // const registerResponseDTO = RegisterUserResponseDTO.fromJSON(registerResponse.$data);

    // // create player for new user
  });
});
