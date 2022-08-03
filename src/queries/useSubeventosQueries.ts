// Modules
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { editSubeventoApi, getSubeventosApi, registerSubeventoApi, removeSubventoApi } from '../api/subevento';

// Hooks
import useBindActions from '../hooks/useBindActions';
import useSelectors from '../hooks/useSelectors';

export default function useSubeventosQueries() {

  const { registerBindedActions, uiBindedActions } = useBindActions();
  const { setSubeventos } = registerBindedActions;
  const { showSnackMessage } = uiBindedActions;
  const { register } = useSelectors();
  const { subeventos } = register;


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
      onSuccess: ({ data }, previousData) => {
        const { id } = data;
        const newEventos = [ ...subeventos, {  ...previousData, id }];
        setSubeventos(newEventos);
        showSnackMessage('Nuevo subevento registrado');
				afterSubmit(false);
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
    return useMutation(removeSubventoApi, {
      onSuccess: (_, idSelected) => {
        const newSubeventos = subeventos.filter((evento) => {
					if (evento.id !== idSelected) return evento;
				});
        setSubeventos(newSubeventos);
				showSnackMessage('Ponente eliminado');
      },
      onError: () => {
        showSnackMessage('Error removiendo evento');
      } 
    });
  }

  return {
    getSubeventosQuery,
    registerSubeventoMutation,
    editSubeventoMutation,
    removeSubeventoMutation
  }
}
