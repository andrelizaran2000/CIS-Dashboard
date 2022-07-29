// Modulesw
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { loginApi, validateTokenApi } from '../api/user';

// Hooks
import useBindActions from '../hooks/useBindActions';

export default function useUserQueries() {

  const { userBindedActions, uiBindedActions } = useBindActions();
  const { loginUser } = userBindedActions;
  const { showSnackMessage } = uiBindedActions;
  const navigation = useNavigate();

  function loginMutation () {
    return useMutation(loginApi, {
      onSuccess: ({ data }) => {
        loginUser(data);
        localStorage.setItem('cis-token', data.token);
        navigation('/home');
      },
      onError:() => {
        showSnackMessage('Error en los datos de usuario');
      },
    });
  }

  function validateToken () {
    return useMutation(validateTokenApi, {
      onSuccess: ({ data }) => {
        loginUser(data);
        localStorage.setItem('cis-token', data.token);
        navigation('/home');
      },
      onError: () => {
        localStorage.removeItem('cis-token');
        navigation('/');
      },
    });
  }

  return {
    loginMutation,
    validateToken
  }
}
