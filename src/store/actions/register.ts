// Modules
import { Dispatch } from 'react'

// Types
import { EventoBodyWithId } from '../../types/eventos';
import { ExpositorBodyWithId } from '../../types/expositor';
import { SubeventoBodyWithId } from '../../types/subeventos';
import { PossibleRegisterActions, RegisterActions } from '../types/register';

export function setExpositores (data:ExpositorBodyWithId[]) {
  return (dispatch:Dispatch<PossibleRegisterActions>) => {
    dispatch({
      type:RegisterActions.SET_EXPOSITORES,
      payload:data
    })
  }
}

export function setEventos (data:EventoBodyWithId[]) {
  return (dispatch:Dispatch<PossibleRegisterActions>) => {
    dispatch({
      type:RegisterActions.SET_EVENTOS,
      payload:data
    })
  }
}

export function setSubeventos (data:SubeventoBodyWithId[]) {
  return (dispatch:Dispatch<PossibleRegisterActions>) => {
    dispatch({
      type:RegisterActions.SET_SUBEVENTOS,
      payload:data
    })
  }
}