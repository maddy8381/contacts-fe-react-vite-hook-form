import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          },
          success: {
            duration: 4000,
            style: {
              background: '#10b981'
            }
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444'
            }
          }
        }}
      />
    </AuthProvider>
  </StrictMode>
);
