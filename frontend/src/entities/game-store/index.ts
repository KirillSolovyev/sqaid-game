import { gameStore } from './model';
export const { start, addPlayer, vote, eliminatePlayer, startNewRound } = gameStore.actions;

export { gameStore } from './model';
export {
  GameState,
  PlayerStatus,
  PlayerModelTypeEnum,
  ErrRoundFinished,
  ErrRoundNotFound,
  ErrGameOver,
} from './config';
export type { Player, PlayerModelType } from './types';
