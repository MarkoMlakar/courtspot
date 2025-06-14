import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { App } from './components/App.tsx';
import { StoreProvider } from './shared/components/StoreProvider/StoreProvider';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);
