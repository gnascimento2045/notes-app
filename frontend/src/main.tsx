import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // garante que o arquivo CSS existe
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
