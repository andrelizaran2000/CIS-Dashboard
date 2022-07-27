export enum UiActions  {
  SHOW_SNACK_MESSAGE = "SHOW_SNACK_MESSAGE",
  HIDE_SNACK_MESSAGE = "HIDE_SNACK_MESSAGE",
  TOGGLE_HOME_SECTION = "TOGGLE_HOME_SECTION",
  TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE"
}

export type UiState = {
  snackMessage:string;
  homeSection:PossibleHomeSections;
  isEditMode:boolean;
}

export type PossibleUiActions = 
  ShowSnackMessage | 
  HideSnackMessage | 
  ToggleHomeSection |
  ToggleEditMode;

export type PossibleHomeSections = 'expositores' | 'eventos' | 'subeventos';

export type ShowSnackMessage = {
  type:UiActions.SHOW_SNACK_MESSAGE,
  payload:string
}

export type HideSnackMessage = {
  type:UiActions.HIDE_SNACK_MESSAGE,
  payload:null
}

export type ToggleHomeSection = {
  type:UiActions.TOGGLE_HOME_SECTION,
  payload:PossibleHomeSections
}

export type ToggleEditMode = {
  type:UiActions.TOGGLE_EDIT_MODE,
  payload:null
}

