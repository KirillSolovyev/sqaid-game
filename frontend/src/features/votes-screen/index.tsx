import type { FC } from 'react';
import { useAppSelector } from '@/shared/store';

export const VotesScreen: FC = () => {
  const gameStore = useAppSelector(state => state.game);
  const activeRound = gameStore.rounds.find(round => round.id === gameStore.currentRoundId);
  if (!activeRound) {
    return <div>No active round found</div>;
  }

  const votes = Object.entries(activeRound.votes).map(([playerId, voteCount]) => ({
    id: playerId,
    voteCount,
  }));

  return (
    <div>
      <h2>Votes</h2>
      <ul>
        {votes.map(vote => (
          <li key={vote.id}>
            {vote.id} - {vote.voteCount}
          </li>
        ))}
      </ul>
    </div>
  );
};
