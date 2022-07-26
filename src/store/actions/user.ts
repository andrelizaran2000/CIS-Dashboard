// Modules
import { Dispatch } from 'redux';

// Types
import { LoginData } from '../../types/user';
import { PossibleUserActions, UserActions } from '../types/user';

export function loginUser (data:LoginData) {
  return (dispatch:Dispatch<PossibleUserActions>) => {
    localStorage.setItem('cis-token', data.token);
    dispatch({
      type:UserActions.LOG_IN_USER,
      payload:data
    });
  }
}

export function logoutUser () {
  return (dispatch:Dispatch<PossibleUserActions>) => {
    localStorage.removeItem('cis-token');
    dispatch({
      type:UserActions.LOG_OUT_USER,
      payload:null
    })
  }
}