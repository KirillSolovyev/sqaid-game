import { AppChat } from '@/widgets/chat-container';
import { VotesScreen } from '@/features/votes-screen';

function App() {
  return (
    <main className="bg-teal-1000 p-4 h-full flex flex-col">
      <AppChat />
      <VotesScreen />
    </main>
  );
}

export default App;
