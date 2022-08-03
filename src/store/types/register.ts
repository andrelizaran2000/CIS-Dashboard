// Types
import { EventoBodyWithId } from '../../types/eventos';
import { ExpositorBodyWithId } from '../../types/expositor'
import { CleanSubEventBodyFromDBWithId } from '../../types/subeventos';

export enum RegisterActions  {
  SET_EXPOSITORES = "SET_EXPOSITORES",
  SET_EVENTOS = "SET_EVENTOS",
  SET_SUBEVENTOS = "SET_SUBEVENTOS"
};

export type RegisterState = {
  expositores:ExpositorBodyWithId[];
  eventos:EventoBodyWithId[];
  subeventos:CleanSubEventBodyFromDBWithId[];
}

export type PossibleRegisterActions = SetExpositores | SetEventos | SetSubeventos;

export type SetExpositores = {
  type:RegisterActions.SET_EXPOSITORES,
  payload:ExpositorBodyWithId[];
}

export type SetEventos = {
  type:RegisterActions.SET_EVENTOS,
  payload:EventoBodyWithId[];
}

export type SetSubeventos = {
  type:RegisterActions.SET_SUBEVENTOS,
  payload:CleanSubEventBodyFromDBWithId[];
}