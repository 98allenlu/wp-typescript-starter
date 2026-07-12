import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// Import your global CSS here
import '../../../default_shadcn_theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
