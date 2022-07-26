// Modules
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

// Router
import Router from './router/Router';

// Store
import { store } from './store/store';

// Components
import SnackContainer from './components/containers/SnackContainer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackContainer>
        <Router/>
      </SnackContainer>
    </Provider>
  </React.StrictMode>
)
