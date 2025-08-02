import { configureStore } from '@reduxjs/toolkit';
import { chatStore } from '@/entities/chat-store';

export const store = configureStore({
  reducer: {
    chat: chatStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
