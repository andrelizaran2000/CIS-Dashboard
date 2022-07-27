// Types
import { UiActions, PossibleUiActions, UiState } from '../types/ui';

const initialState:UiState = { homeSection:'expositores', snackMessage:'', isEditMode:false };

export default function uiReducer (state:UiState = initialState, { payload, type }:PossibleUiActions):UiState {
  switch (type) {
    case UiActions.SHOW_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage:payload,
      }
    case UiActions.HIDE_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage:''
      } 
    case UiActions.TOGGLE_HOME_SECTION:
      return {
        ...state,
        homeSection:payload
      }
    case UiActions.TOGGLE_EDIT_MODE: 
      return {
        ...state,
        isEditMode:!state.isEditMode
      }
    default:
      return state;
  }
}