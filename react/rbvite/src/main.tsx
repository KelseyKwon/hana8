import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CounterProvider } from './hooks/CounterContext.tsx';

// javascript 실행의 시작.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </StrictMode>
);
