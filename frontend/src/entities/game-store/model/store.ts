import dayjs from 'dayjs';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  GameMaxRounds,
  GameState,
  PlayerStatus,
  ErrRoundNotFound,
  ErrPlayerNotFound,
  ErrMaxRoundsReached,
  UserPlayerId,
  RoundDurationInMs,
} from '../config';
import type { GameInitialState, GameStateType, Player } from '../types';

const initialState: GameInitialState = {
  rounds: [],
  players: [],
  cashPrize: 0,
  currentRoundId: '',
  state: GameState.WaitingForStart,
};

type CreatePlayerPayload = Omit<Player, 'status'>;
type UpdatePlayerPayload = Omit<Player, 'model' | 'model'>;
type VotePayload = {
  playerId: string;
  voteForPlayerId: string;
};
type ChangeGameStatePayload = {
  newState: GameStateType;
};

const startNewRoundFn = (state: GameInitialState) => {
  if (state.rounds.length >= GameMaxRounds) {
    throw new ErrMaxRoundsReached();
  }

  const playersVotes = state.players.reduce(
    (acc, player) => {
      acc[player.id] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  playersVotes[UserPlayerId] = '';

  const startTime = dayjs();
  const endTime = startTime.add(RoundDurationInMs, 'milliseconds');

  const newRound = {
    id: startTime.unix().toString(),
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    votes: playersVotes,
  };
  state.rounds.push(newRound);
  state.currentRoundId = newRound.id;
};

export const gameStore = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewRound: startNewRoundFn,
    setGameState: (state: GameInitialState, newState: PayloadAction<ChangeGameStatePayload>) => {
      state.state = newState.payload.newState;
    },
    addPlayer: (state, action: PayloadAction<CreatePlayerPayload>) => {
      state.players.push({
        ...action.payload,
        status: PlayerStatus.Active,
      });
    },
    updatePlayer: (state, action: PayloadAction<UpdatePlayerPayload>) => {
      const playerId = action.payload.id;
      const playerToUpdate = state.players.find(player => player.id === playerId);
      if (!playerToUpdate) {
        throw new ErrPlayerNotFound(playerId);
      }

      Object.assign(playerToUpdate, action.payload);
    },
    vote: (state, action: PayloadAction<VotePayload>) => {
      const activeRound = state.rounds.find(round => round.id === state.currentRoundId);
      if (!activeRound) {
        throw new ErrRoundNotFound();
      }

      const { playerId, voteForPlayerId } = action.payload;
      if (!(playerId in activeRound.votes) || !(voteForPlayerId in activeRound.votes)) {
        throw new ErrPlayerNotFound(playerId);
      }

      activeRound.votes[playerId] = voteForPlayerId;
    },
  },
});

export const { vote, startNewRound, addPlayer } = gameStore.actions;
