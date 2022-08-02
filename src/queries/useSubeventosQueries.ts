// Modules
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { editSubeventoApi, getSubeventosApi, registerSubeventoApi } from '../api/subevento';

// Hooks
import useBindActions from '../hooks/useBindActions';

export default function useSubeventosQueries() {

  const { registerBindedActions, uiBindedActions } = useBindActions();
  const { setSubeventos } = registerBindedActions;
  const { showSnackMessage } = uiBindedActions;

  function getSubeventosQuery () {
    return useQuery(['get-subeventos'], getSubeventosApi, {
      onSuccess: ({ data }) => {
        const { subevents } = data;
        setSubeventos(subevents);
      },
      onError: () => {
        showSnackMessage('Error obteniendo subeventos');
      },  
      enabled:false
    })
  }

  function registerSubeventoMutation (afterSubmit: (isEditMode:boolean) => void) {
    return useMutation(registerSubeventoApi, {
      onSuccess: () => {
        
      },
      onError: () => {
        showSnackMessage('Error registrando subevento');
      }
    });
  }
  
  function editSubeventoMutation (afterSubmit: (isEditMode:boolean) => void) {
    return useMutation(editSubeventoApi, {
      onSuccess: () => {
        
      },
      onError: () => {
        showSnackMessage('Error editando subevento');
      }
    });
  }

  function removeSubeventoMutation () {

  }

  return {
    getSubeventosQuery,
    registerSubeventoMutation,
    editSubeventoMutation,
    removeSubeventoMutation
  }
}
