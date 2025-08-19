import dayjs from 'dayjs';

import { SqaidPlayer } from '@/entities/player';
import { vote, ErrRoundFinished, type Round, type Player } from '@/entities/game-store';

import type { AppStore } from '../../app-store';
import {
  waitFor,
  typeMessage,
  getPlayerModel,
  voteForPlayerTool,
  voteForPlayerSchema,
  storeMessagesToAiMessages,
} from '../utils';

type DiscussionHandlerPayload = {
  player: Player;
  round: Round;
  store: AppStore;
};

export const handleDiscussion = async ({ store, round, player }: DiscussionHandlerPayload) => {
  const now = dayjs();
  if (now.isAfter(dayjs(round.endTime))) {
    throw new ErrRoundFinished();
  }

  const playerModel = getPlayerModel(player);
  const AIPlayer = new SqaidPlayer(player.name, playerModel, [
    { role: 'system', content: player.instructions },
  ]);

  const timeUntilEndOfRound = dayjs(round.endTime).diff(dayjs(), 'seconds');
  const isTimeToVote = timeUntilEndOfRound < 40;
  const tools = isTimeToVote
    ? {
        voteForPlayer: voteForPlayerTool(),
      }
    : undefined;

  const result = await AIPlayer.generateText(
    storeMessagesToAiMessages(store.getState().chat.messages),
    tools,
  );

  const voteToolCall = result.toolCalls?.find(call => call.toolName === 'voteForPlayer');
  if (voteToolCall) {
    try {
      if (voteToolCall.args) {
        const voteArgs = voteForPlayerSchema.parse(voteToolCall.args);
        await typeMessage(voteArgs.message, player);
        store.dispatch(vote({ playerId: player.id, voteForPlayerId: voteArgs.playerId }));
      }
    } catch (error) {
      throw new Error(`Failed to parse vote tool args: ${error}`);
    }
  } else {
    await typeMessage(result.text, player);
  }

  await waitFor(2000);
};
