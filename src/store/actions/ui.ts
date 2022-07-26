// Modules
import { Dispatch } from 'react';

// Types
import { PossibleHomeSections, PossibleUiActions, UiActions } from '../types/ui';

export function showSnackMessage (data:string) {
  return (dispatch:Dispatch<PossibleUiActions>) => {
    dispatch({
      type:UiActions.SHOW_SNACK_MESSAGE,
      payload:data
    })
  }
}

export function hideSnackMessage () {
  return (dispatch:Dispatch<PossibleUiActions>) => {
    dispatch({
      type:UiActions.HIDE_SNACK_MESSAGE,
      payload:null
    })
  }
}

export function toggleHomeSection (data:PossibleHomeSections) {
  return (dispatch:Dispatch<PossibleUiActions>) => {
    dispatch({
      type:UiActions.TOGGLE_HOME_SECTION,
      payload:data
    })
  }
}

export function toggleEditMode () {
  return (dispatch:Dispatch<PossibleUiActions>) => {
    dispatch({
      type:UiActions.TOGGLE_EDIT_MODE,
      payload:null
    })
  }
}