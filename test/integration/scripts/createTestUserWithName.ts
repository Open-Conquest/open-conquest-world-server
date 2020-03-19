/* eslint-disable max-len */
import {registerUserService} from '../../../src/modules/user/services/registerUser';
import {UserCredentials} from '../../../src/modules/user/domain/UserCredentials';
import {Username} from '../../../src/modules/user/domain/Username';
import {Password} from '../../../src/modules/user/domain/Password';
import {User} from '../../../src/modules/user/domain/User';
import {userRepository} from '../../../src/modules/user/repos/implementations';

/**
 * Reusable script to create a new user with username/password
 * for integration testing.
 *
 * @param {string} usernameStr
 * @export
 * @return {User}
 */
export async function createTestUserWithName(usernameStr: string): Promise<User> {
  // register a new user with login credentials (usernameStr, passwordStr)
  const passwordStr = 'test_password';
  const username = new Username(usernameStr);
  const password = new Password(passwordStr);
  const credentials = new UserCredentials(username, password);
  await registerUserService.registerUser(credentials);

  // get user from database to return as the created user
  return await userRepository.getUserPasswordWithUsername(username);
}
