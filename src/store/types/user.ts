// Types
import { LoginData } from '../../types/user';

export type PossibleUserActions = LogInUser | LogOut;

export enum UserActions {
  LOG_IN_USER = 'LOG_IN_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
}

export type LogInUser = {
  type:UserActions.LOG_IN_USER,
  payload:LoginData
}

export type LogOut = {
  type:UserActions.LOG_OUT_USER,
  payload:null
}