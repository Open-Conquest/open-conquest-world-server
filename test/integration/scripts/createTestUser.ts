import {registerUserService} from '../../../src/modules/user/services/registerUser';
import {UserCredentials} from '../../../src/modules/user/domain/UserCredentials';
import {Username} from '../../../src/modules/user/domain/Username';
import {Password} from '../../../src/modules/user/domain/Password';
import {User} from '../../../src/modules/user/domain/User';
import {userRepository} from '../../../src/modules/user/repos/implementations';
import {UserFactory} from '../../../src/modules/user/factories/UserFactory';
import {log} from '../../../src/shared/utils/log';

/**
 * Reusable script to create a new user for integration testing.
 *
 * @export
 * @return {Player}
 */
export async function createTestUser(): Promise<User> {
  const userFactory = new UserFactory();

  // register a new user
  const username = 'test_username';
  const password = 'test_password';
  const credentials = new UserCredentials(
      new Username(username),
      new Password(password),
  );
  await registerUserService.registerUser(credentials);

  // return user as it is found in the database
  return await userRepository.getUserPasswordWithUsername(
      new Username(username),
  );
}
