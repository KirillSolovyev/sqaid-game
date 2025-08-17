import { configureStore } from '@reduxjs/toolkit';
import { chatStore } from '@/entities/chat-store';
import { gameStore } from '@/entities/game-store';

export const store = configureStore({
  reducer: {
    chat: chatStore.reducer,
    game: gameStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
