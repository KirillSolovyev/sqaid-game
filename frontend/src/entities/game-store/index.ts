export {
  vote,
  start,
  addPlayer,
  finishGame,
  eliminatePlayer,
  setGameState,
  startNewRound,
  gameStore,
} from './model';
export {
  GameState,
  PlayerStatus,
  UserPlayerId,
  GameMaxRounds,
  PlayerModelTypeEnum,
  ErrRoundFinished,
  ErrRoundNotFound,
  ErrGameOver,
} from './config';
export type { Player, PlayerModelType, Round } from './types';
