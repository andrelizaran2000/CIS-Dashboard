// Modules
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { userActions, uiActions, registerActions } from '../store/actions/index'

export default function useBindActions() {
  const dispatch = useDispatch();
  const userBindedActions = bindActionCreators(userActions, dispatch);
  const uiBindedActions = bindActionCreators(uiActions, dispatch);
  const registerBindedActions = bindActionCreators(registerActions, dispatch);
  return {
    userBindedActions, uiBindedActions, registerBindedActions
  }
}