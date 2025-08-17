import { GameState, PlayerModelTypeEnum, PlayerStatus } from './config';

export type GameStateType = keyof typeof GameState;

export type PlayerStatusType = keyof typeof PlayerStatus;

export type PlayerModelType = keyof typeof PlayerModelTypeEnum;
export type PlayerModel = {
  type: PlayerModelType;
  value: string;
};

export type Player = {
  id: string;
  name: string;
  model: PlayerModel;
  instructions: string;
  status: PlayerStatusType;
};

export type PlayerId = string;
export type VoteForPlayerId = string;

export type Round = {
  id: string;
  startTime: string;
  endTime: string;
  votes: Record<PlayerId, VoteForPlayerId>;
};

export type GameInitialState = {
  rounds: Round[];
  players: Player[];
  cashPrize: number;
  state: GameStateType;
  currentRoundId: string;
};
