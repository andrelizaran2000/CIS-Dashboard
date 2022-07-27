// Types
import { PossibleRegisterActions, RegisterActions, RegisterState } from '../types/register';

const initialState:RegisterState = {
  eventos:[],
  expositores:[],
  subeventos:[]
}

export default function registerReducer (state:RegisterState = initialState, { payload, type }:PossibleRegisterActions):RegisterState {
  switch (type) {
    case RegisterActions.SET_EXPOSITORES:
      return {
        ...state,
        expositores:payload
      }
    case RegisterActions.SET_EVENTOS:
      return {
        ...state,
        eventos:payload
      }
    case RegisterActions.SET_SUBEVENTOS:
      return {
        ...state,
        subeventos:payload
      }
    default:
      return state;
  }
}

