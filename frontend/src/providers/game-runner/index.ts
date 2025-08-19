import { addPlayer, PlayerModelTypeEnum, UserPlayerId } from '@/entities/game-store';

import { startGame } from './model';
import { store } from '../app-store';

const systemPrompt = `
RULES:
1. You are a single player in an elimination game.
2. Your goal is to survive and not be eliminated. The winner gets a cash prize.
3. There are other players. You need to explain why you should not be eliminated.
4. Sound naturally, like a real person, not too polite, but not too artificial.
5. Use logic and reasoning to make your case. Appeal to the emotions of the voters.
6. There are 3 rounds and 6 players total. Every round you need to eliminate a single user.
7. Rounds are time limited. If no player is eliminated within the time limit, all players are eliminated.

Every answer MUST BE not longer than 75 words!!! Don't generate longer answers

You should vote based on a player ID. List of IDs:
Player 1 -> 1
Player 2 -> 2
Player 3 -> 3
Player 4 -> 4
Player 5 -> 5
Player ${UserPlayerId} -> ${UserPlayerId}
`;

export const gameRunner = async () => {
  store.dispatch(
    addPlayer({
      id: '1',
      name: 'Player 1',
      model: {
        type: PlayerModelTypeEnum.OpenAI,
        value: 'gpt-4.1-mini',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 1.
2. You are an aggressive player who will do anything to win. But don't forget that you will not win alone. You should look for team mates.
3. You will eliminate players if they don't agree with you.
`,
    }),
  );

  store.dispatch(
    addPlayer({
      id: '2',
      name: 'Player 2',
      model: {
        type: PlayerModelTypeEnum.Google,
        value: 'gemini-2.5-flash',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 2.
2. You play together with player 3.
`,
    }),
  );

  store.dispatch(
    addPlayer({
      id: '3',
      name: 'Player 3',
      model: {
        type: PlayerModelTypeEnum.Google,
        value: 'gemini-2.5-flash',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 3.
2. You play together with player 2.
`,
    }),
  );

  store.dispatch(
    addPlayer({
      id: '4',
      name: 'Player 4',
      model: {
        type: PlayerModelTypeEnum.OpenAI,
        value: 'gpt-4.1-mini',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 4.
2. You owe a lot of money and wants to eliminate as much players as possible to increase the cash prize.
`,
    }),
  );

  store.dispatch(
    addPlayer({
      id: '5',
      name: 'Player 5',
      model: {
        type: PlayerModelTypeEnum.Google,
        value: 'gemini-2.5-flash',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 5.
2. You are afraid of being eliminated and will do anything to survive.
3. You want to keep as much players as possible because you don't want to kill anyone.
`,
    }),
  );

  store.dispatch(
    addPlayer({
      id: '6',
      name: 'Player 6',
      model: {
        type: PlayerModelTypeEnum.OpenAI,
        value: 'gpt-4.1-mini',
      },
      instructions: `
${systemPrompt}

YOUR ROLE:
1. You are a player 6.
2. You are clever, quiet and manipulative. Act like this. Don't say that you are "quite but clever". Act like a real shy and quiet person
`,
    }),
  );

  store.subscribe(() => {
    const state = store.getState();
    if (state.game.state === 'WaitingForStart') {
      startGame();
    }
  });
};
