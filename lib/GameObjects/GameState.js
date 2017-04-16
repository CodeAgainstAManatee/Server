/**
 * Game States.
 *
 * <tt>INITIALIZING</tt>: The game object has been created, but not all
 * information about the game has been passed in yet.
 *
 * <tt>WAITING_FOR_PLAYERS</tt>: The game object has been created and all
 * information about the game has been passed in. Waiting for player cap to be
 * reached or for the owner of the game to manually start it once the minimum
 * has been met.
 *
 * <tt>STARTING</tt>: The game has been started, and is waiting for all players
 * to verify connection status. Players who don't verify connection status
 * within a reasonable amount of time will be automatically kicked.
 *
 * <tt>IN_GAME</tt>: The game is now running.
 *
 * <tt>FINISHED</tt>: The game has finished, a winner has been chosen, and the
 * game is ready to be destroyed.
 */
let GameState = {
  INITIALIZING: 0,
  WAITING_FOR_PLAYERS: 1,
  STARTING: 2,
  IN_GAME: 3,
  FINISHED: 4
};

module.exports = GameState;
