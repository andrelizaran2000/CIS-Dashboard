// Types
import { LoginData } from '../../types/user';
import { PossibleUserActions, UserActions } from '../types/user';

const initialState:LoginData = { token:'', firstName:'', lastName:'' };

export default function userReducer (state:LoginData = initialState, { payload, type }:PossibleUserActions):LoginData {
  switch (type) {
    case UserActions.LOG_IN_USER:
      return {
        ...payload,
        ...state,
      }
    case UserActions.LOG_IN_USER: 
      return initialState;
    default:
      return initialState;
  }
}