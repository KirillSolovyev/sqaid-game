import z from 'zod';
import { tool, type LanguageModelV1, type CoreMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

import {
  addMessage,
  updateMessage,
  ChatMessageRole,
  type ChatMessage,
} from '@/entities/chat-store';
import { PlayerModelTypeEnum, type Player } from '@/entities/game-store';
import { store } from '../app-store';

export const getPlayerModel = (player: Player): LanguageModelV1 => {
  if (player.model.type === PlayerModelTypeEnum.OpenAI) {
    const model = createOpenAI({
      apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    });

    return model(player.model.value);
  } else {
    const model = createGoogleGenerativeAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    return model(player.model.value);
  }
};

export const storeMessagesToAiMessages = (messages: ChatMessage[]): CoreMessage[] => {
  return messages.map(msg => ({
    role: msg.role === ChatMessageRole.System ? 'assistant' : 'user',
    content: `${msg.userName}: ${msg.text}`,
  }));
};

export const waitFor = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const typeMessage = (message: string, player: Player) => {
  const messageId = Date.now().toString();

  const typeHelper = (messageIdx: number) => {
    if (messageIdx >= message.length) {
      return Promise.resolve();
    }

    if (messageIdx === 0) {
      store.dispatch(
        addMessage({
          id: messageId,
          text: message[0],
          userName: player.name,
          role: ChatMessageRole.Player,
        }),
      );
    } else {
      const typedText = message.slice(0, messageIdx + 1);
      store.dispatch(
        updateMessage({
          id: messageId,
          text: typedText,
        }),
      );
    }

    return new Promise(resolve => {
      setTimeout(() => {
        typeHelper(messageIdx + 1).then(resolve);
      }, 25);
    });
  };

  return typeHelper(0);
};

export const voteForPlayerSchema = z.object({
  playerId: z.string().describe('The ID of a player to vote for'),
  message: z
    .string()
    .describe('A message to users explaining why you voted for this player or with any thoughts'),
});

type VoteForPlayerInput = z.infer<typeof voteForPlayerSchema>;

export const voteForPlayerTool = () => {
  return tool({
    description: 'Vote for a player to eliminate. You should be sure about your choice',
    parameters: voteForPlayerSchema,
    execute: async ({ playerId, message }: VoteForPlayerInput) => {
      return { playerId, message };
    },
  });
};
