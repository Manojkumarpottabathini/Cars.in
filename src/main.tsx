import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ChatWidget from './ChatWidget.tsx'; // 1. Added the import
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Wrapped both components inside StrictMode so they share one parent */}
    <App />
    <ChatWidget />
  </StrictMode>
);