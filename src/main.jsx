import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { Store } from './Redux/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </StrictMode>,
)
