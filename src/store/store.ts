// Modules
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// Reducers
import combinedReducers from './reducers';

export const store = createStore(
  combinedReducers,
  {},
  applyMiddleware(thunk)
)

export type State = ReturnType<typeof combinedReducers>