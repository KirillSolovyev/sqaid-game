export const RoundDurationInMs = 120_000;
export const GameMaxRounds = 3;
export const UserPlayerId = '256';

export const GameState = {
  Voting: 'Voting',
  GameOver: 'GameOver',
  Discussion: 'Discussion',
  WaitingForStart: 'WaitingForStart',
} as const;

export const PlayerStatus = {
  Active: 'Active',
  Eliminated: 'Eliminated',
} as const;

export const PlayerModelTypeEnum = {
  OpenAI: 'OpenAI',
  Google: 'Google',
} as const;

export class ErrRoundNotFound extends Error {
  constructor() {
    super('No active round found');
    this.name = 'RoundNotFound';
  }
}

export class ErrRoundFinished extends Error {
  constructor() {
    super('Round has finished');
    this.name = 'RoundFinished';
  }
}

export class ErrPlayerNotFound extends Error {
  constructor(playerId: string) {
    super(`Player is not in the game: ${playerId}`);
    this.name = 'PlayerNotFound';
  }
}

export class ErrMaxRoundsReached extends Error {
  constructor() {
    super('Maximum number of rounds reached');
    this.name = 'MaxRoundsReached';
  }
}

export class ErrGameOver extends Error {
  constructor() {
    super('Game is over');
    this.name = 'GameOver';
  }
}
