/* eslint-disable require-jsdoc */
import {Player} from '../domain/Player';
import {EntityID} from '../../../shared/domain/EntityID';
import {Playername} from '../domain/Playername';

/**
 * This class is meant to handle the construction of `Player` entities. This
 * class exists to reduce duplicating construction code for instantiating
 * different variants of Player.
 *
 * @class PlayerFactory
 */
export class PlayerFactory {
  /**
   * Creates an instance of PlayerFactory.
   * @memberof PlayerFactory
   */
  constructor() {}

  createPlayer(id: number, name: string): Player {
    return new Player(
        new EntityID(id),
        new Playername(name),
    );
  }

  createPlayerWithName(name: string): Player {
    return new Player(
        null,
        new Playername(name),
    );
  }
}
