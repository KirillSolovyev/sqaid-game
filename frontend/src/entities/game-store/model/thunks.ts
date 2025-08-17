import type { AppThunk } from '@/shared/store';
import { gameStore } from './store';
import { ErrPlayerNotFound, GameState, PlayerStatus, UserPlayerId } from '../config';

const { actions } = gameStore;

export const finishGame = (): AppThunk => {
  return dispatch => {
    dispatch(actions.setGameState({ newState: GameState.GameOver }));
  };
};

export const start = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState().game;
    if (state.players.length < 1) {
      throw new Error('Cannot start game without players');
    }

    dispatch(actions.setGameState({ newState: GameState.Discussion }));
    dispatch(actions.startNewRound());
  };
};

export const eliminatePlayer = ({ playerId }: { playerId: string }): AppThunk => {
  return (dispatch, getState) => {
    const state = getState().game;
    const playerToBeEliminated = state.players.find(player => player.id === playerId);
    if (!playerToBeEliminated) {
      throw new ErrPlayerNotFound(playerId);
    }

    if (playerId === UserPlayerId) {
      finishGame();
      return;
    }

    dispatch(actions.updatePlayer({ ...playerToBeEliminated, status: PlayerStatus.Eliminated }));
  };
};
