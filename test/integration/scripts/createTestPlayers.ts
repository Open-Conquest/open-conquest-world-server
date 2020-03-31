/* eslint-disable max-len */
import {createTestUserWithName} from './createTestUserWithName';
import {Player} from '../../../src/modules/game/domain/Player';
import {Playername} from '../../../src/modules/game/domain/Playername';
import {createPlayerController} from '../../../src/modules/game/services/createPlayer';
import {UserDTO} from '../../../src/modules/user/dtos/UserDTO';
import {CreatePlayerRequestDTO} from '../../../src/modules/game/services/createPlayer/CreatePlayerRequestDTO';
import {PlayerDTO} from '../../../src/modules/game/dtos/PlayerDTO';
import {playerRepository} from '../../../src/modules/game/repos/implementations';
import {log} from '../../../src/shared/utils/log';
import { EntityID } from '../../../src/shared/domain/EntityID';

/**
 * Create 10 players in the world; test_playername0-10
 *
 * @export
 * @return {Array<Player>}
 */
export async function createTestPlayers(): Promise<Array<Player>> {
  // create 10 test players
  for (let i = 0; i < 10; i++) {
    // create user
    const username = 'test_username' + i;
    const user = await createTestUserWithName(username);
    const userDTO = new UserDTO(user.$id.$value, user.$username.$value);
    // create player
    const playername = 'test_playername' + i;
    const player = new Player(new EntityID(-1), new Playername(playername));
    const createPlayerDTO = new CreatePlayerRequestDTO(new PlayerDTO(player.$id.$value, player.$name.$value));
    await createPlayerController.createPlayer(userDTO, createPlayerDTO);
  }
  return await playerRepository.getAllPlayers();
}
