// Modules
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// Router
import Router from './router/Router';

// Store
import { store } from './store/store';

// Components
import SnackContainer from './components/containers/SnackContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Provider store={store}>
          <SnackContainer>
            <Router/>
          </SnackContainer>
        </Provider>
      </LocalizationProvider >
    </QueryClientProvider>
  </React.StrictMode>
)
