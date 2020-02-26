import {Player} from "../../../../../../src/modules/game/domain/Player";
import {PlayerFactory} from '../../../../../../src/modules/game/factories/PlayerFactory';
import {registerUserService} from '../../../../../../src/modules/user/services/registerUser';
import {createPlayerService} from '../../../../../../src/modules/game/services/createPlayer';
import {UserCredentials} from '../../../../../../src/modules/user/domain/UserCredentials';
import {Username} from '../../../../../../src/modules/user/domain/Username';
import {Password} from '../../../../../../src/modules/user/domain/Password';
import {User} from '../../../../../../src/modules/user/domain/User';
import { userRepository } from "../../../../../../src/modules/user/repos/implementations";
import { UserFactory } from "../../../../../../src/modules/user/factories/UserFactory";
import { Playername } from "../../../../../../src/modules/game/domain/Playername";
import { log } from "../../../../../../src/shared/utils/log";

/**
 * Reusable script to create a new player to use in integration tests.
 *
 * @export
 * @return {Player}
 */
export async function createTestPlayer(): Promise<Player> {
  const userFactory = new UserFactory();

  // register a new user
  const username = 'test_username';
  const password = 'test_password';
  const credentials = new UserCredentials(
      new Username(username),
      new Password(password),
  );
  await registerUserService.registerUser(credentials);

  // get user from database
  let user = userFactory.createUser(
      null,
      username,
      password,
      null,
      null,
  );
  user = await userRepository.getUserPasswordWithUsername(
      new Username(username),
  );

  // create a new player for the user
  const playername = 'test_playername';
  const player = new Player(
      null,
      new Playername(playername),
  );
  return await createPlayerService.createPlayer(user, player);
}
