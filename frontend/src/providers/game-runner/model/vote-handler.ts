import { SqaidPlayer } from '@/entities/player';
import { addMessage, ChatMessageRole, type ChatMessage } from '@/entities/chat-store';
import { vote, eliminatePlayer, type Round, type Player } from '@/entities/game-store';

import type { AppStore } from '../../app-store';
import {
  waitFor,
  typeMessage,
  getPlayerModel,
  voteForPlayerSchema,
  storeMessagesToAiMessages,
} from '../utils';

type VoteHandlerPayload = {
  round: Round;
  player: Player;
  store: AppStore;
};

type EliminationHandlerPayload = {
  round: Round;
  store: AppStore;
};

export const handleVoting = async ({ store, round, player }: VoteHandlerPayload) => {
  const votesMap = Object.entries(round.votes).reduce((acc, vote) => {
    const [playerId, voteForPlayerId] = vote;
    if (voteForPlayerId) {
      return acc + `Player ${playerId} voted for Player ${voteForPlayerId}\n`;
    }

    return acc + `Player ${playerId} has not voted yet\n`;
  }, '');

  const votesStateMessage: ChatMessage = {
    id: new Date().toISOString(),
    role: ChatMessageRole.System,
    userName: 'System',
    text: `Now you have to vote for a player to eliminate. However, there is an option not to vote

    Already casted votes: 
    ${votesMap}
    `,
  };

  const votesWithStatementsMsg = [...store.getState().chat.messages, votesStateMessage];

  const playerModel = getPlayerModel(player);
  const AIPlayer = new SqaidPlayer(player.name, playerModel, [
    { role: 'system', content: player.instructions },
  ]);
  const result = await AIPlayer.generateObject(
    storeMessagesToAiMessages(votesWithStatementsMsg),
    voteForPlayerSchema,
  );

  try {
    const voteResult = voteForPlayerSchema.parse(result.object);
    await typeMessage(voteResult.message, player);
    store.dispatch(vote({ playerId: player.id, voteForPlayerId: voteResult.playerId }));
  } catch (error) {
    throw new Error(`Failed to parse vote result: ${error}`);
  }

  await waitFor(2000);
};

export const handleElimination = async ({ store, round }: EliminationHandlerPayload) => {
  const accVotes = Object.entries(round.votes).reduce(
    (acc, entries) => {
      const voteForPlayerId = entries[1];
      acc[voteForPlayerId] += 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const [eliminatedPlayer] = Object.entries(accVotes).sort((a, b) => b[1] - a[1]);
  const [eliminatedPlayerId, votes] = eliminatedPlayer;

  store.dispatch(eliminatePlayer({ playerId: eliminatedPlayerId }));

  store.dispatch(
    addMessage({
      id: Date.now().toString(),
      text: `Round has finished! Player ${eliminatedPlayerId} has been eliminated with ${votes} votes.`,
      userName: 'System',
      role: ChatMessageRole.System,
    }),
  );
};
