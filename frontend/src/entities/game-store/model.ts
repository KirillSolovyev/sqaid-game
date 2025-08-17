import dayjs from 'dayjs';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GameState, PlayerStatus, ErrRoundNotFound, ErrPlayerNotFound } from './config';
import type { GameInitialState, Player } from './types';

const initialState: GameInitialState = {
  rounds: [],
  players: [],
  cashPrize: 0,
  currentRoundId: '',
  state: GameState.WaitingForStart,
};

type PlayerPayload = Omit<Player, 'status'>;
type EliminatePlayerPayload = {
  playerId: string;
};
type VotePayload = {
  playerId: string;
  voteForPlayerId: string;
};

const startNewRound = (state: GameInitialState) => {
  const playersVotes = state.players.reduce(
    (acc, player) => {
      acc[player.id] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const startTime = dayjs();
  const endTime = startTime.add(60, 'seconds');

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
    startNewRound,
    start: state => {
      if (state.players.length < 1) {
        throw new Error('Cannot start game without players');
      }

      state.state = GameState.AiPlayerTyping;
      startNewRound(state);
    },
    addPlayer: (state, action: PayloadAction<PlayerPayload>) => {
      state.players.push({
        ...action.payload,
        status: PlayerStatus.Active,
      });
    },
    eliminatePlayer: (state, action: PayloadAction<EliminatePlayerPayload>) => {
      const playerId = action.payload.playerId;
      const playerToBeEliminated = state.players.find(player => player.id === playerId);
      if (!playerToBeEliminated) {
        throw new ErrPlayerNotFound(playerId);
      }

      playerToBeEliminated.status = PlayerStatus.Eliminated;
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
