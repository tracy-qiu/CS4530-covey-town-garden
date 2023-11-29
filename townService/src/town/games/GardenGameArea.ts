import InvalidParametersError, { INVALID_COMMAND_MESSAGE } from '../../lib/InvalidParametersError';
import Player from '../../lib/Player';
import {
  Interactable,
  InteractableCommand,
  InteractableCommandReturnType,
  InteractableType,
} from '../../types/CoveyTownSocket';
import InteractableArea from '../InteractableArea';

/**
 * A GardenArea is a GameArea that hosts a community garden.
 */
export default class GardenGameArea extends InteractableArea {
  public toModel(): Interactable {
    return {
      id: this.id,
      occupants: this.occupantsByID,
      type: this.getType(),
    };
  }

  protected getType(): InteractableType {
    return 'GardenArea';
  }

  /**
   * Handle a command from a player in this game area.
   * So far, we do not use this function, but we still included it because we extend from GameArea
   * If the command is unsuccessful (throws an error), the error is propagated to the caller
   *
   * @see InteractableCommand
   *
   * @param command command to handle
   * @param player player making the request
   * @throws InvalidParametersError if the command is not supported or is invalid.
   */
  public handleCommand<CommandType extends InteractableCommand>(
    command: CommandType,
    player: Player,
  ): InteractableCommandReturnType<CommandType> {
    throw new InvalidParametersError(INVALID_COMMAND_MESSAGE);
  }
}
