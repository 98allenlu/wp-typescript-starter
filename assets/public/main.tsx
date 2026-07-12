import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app/App';

// Import your global CSS here (up two levels to the root)
import '../../default_shadcn_theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);