// Modules
import { combineReducers } from 'redux'; 

// Reducers
import uiReducer from './ui';
import userReducer from './user';
import registerReducer from './register';

const combinedReducers = combineReducers ({
  user: userReducer,
  ui: uiReducer,
  register: registerReducer
})

export default combinedReducers;