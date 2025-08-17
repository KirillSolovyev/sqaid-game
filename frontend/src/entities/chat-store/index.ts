import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const ChatMessageRole = {
  User: 'user',
  Player: 'player',
  System: 'system',
} as const;

export type ChatMessageRole = (typeof ChatMessageRole)[keyof typeof ChatMessageRole];

export type ChatMessage = {
  id: string;
  text: string;
  userName: string;
  role: ChatMessageRole;
};

type ChatInitialState = {
  messages: ChatMessage[];
};

const initialState: ChatInitialState = {
  messages: [],
};

export const chatStore = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const message = state.messages.find(msg => msg.id === action.payload.id);
      if (message) {
        message.text = action.payload.text;
      }
    },
  },
});

export const { addMessage, updateMessage } = chatStore.actions;
