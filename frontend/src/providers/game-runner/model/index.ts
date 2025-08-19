import { addMessage, ChatMessageRole } from '@/entities/chat-store';
import {
  start,
  startNewRound,
  finishGame,
  GameState,
  PlayerStatus,
  GameMaxRounds,
  ErrRoundNotFound,
  ErrRoundFinished,
  ErrGameOver,
} from '@/entities/game-store';
import type { Player, Round } from '@/entities/game-store';

import { store, type AppStore } from '../../app-store';
import { handleDiscussion } from './discussion-handler';
import { handleElimination, handleVoting } from './vote-handler';

type RunGameOncePayload = {
  player: Player;
  round: Round;
  store: AppStore;
};

const runGameOnce = async (payload: RunGameOncePayload) => {
  const { player, round, store } = payload;
  const gameStore = store.getState().game;

  switch (gameStore.state) {
    case GameState.Discussion:
      await handleDiscussion({ store, round, player });
      break;
    case GameState.Voting:
      await handleVoting({ store, round, player });
      break;
    case GameState.Elimination:
      await handleElimination({ store, round });
      break;
  }
};

export const startGame = async () => {
  store.dispatch(start());

  store.dispatch(
    addMessage({
      id: Date.now().toString(),
      text: 'The game starts! Introduce yourself',
      userName: 'System',
      role: ChatMessageRole.System,
    }),
  );

  let currentPlayerIndex = 0;

  const runGame = async () => {
    const gameStore = store.getState().game;
    const activePlayers = gameStore.players.filter(
      player => player.status !== PlayerStatus.Eliminated,
    );
    const playersCount = activePlayers.length;
    const player = activePlayers[currentPlayerIndex];
    const round = gameStore.rounds.find(round => round.id === gameStore.currentRoundId);

    if (!round) {
      throw new ErrRoundNotFound();
    }

    if (gameStore.state === GameState.GameOver) {
      throw new ErrGameOver();
    }

    try {
      await runGameOnce({ player, round, store });
      currentPlayerIndex = (currentPlayerIndex + 1) % playersCount;
      runGame();
    } catch (error) {
      if (error instanceof ErrGameOver) {
        console.log('Game over!');
      } else if (error instanceof ErrRoundNotFound) {
        console.log('Round not found!');
      } else if (error instanceof ErrRoundFinished) {
        if (gameStore.rounds.length >= GameMaxRounds) {
          store.dispatch(
            addMessage({
              id: Date.now().toString(),
              text: 'The game is over! Congratulations to the winners!',
              userName: 'System',
              role: ChatMessageRole.System,
            }),
          );
          finishGame();
        } else {
          currentPlayerIndex = 0;
          store.dispatch(startNewRound());
          runGame();
        }
      } else {
        console.error('Error occurred while running game:', error);
      }
    }
  };

  runGame();
};
