import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const ChatMessageRole = {
  User: 'user',
  Assistant: 'assistant',
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
  },
});

export const { addMessage } = chatStore.actions;
