import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/providers/app-store';
import { gameRunner } from '@/providers/game-runner';

import './index.css';
import App from './App.tsx';

gameRunner();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
