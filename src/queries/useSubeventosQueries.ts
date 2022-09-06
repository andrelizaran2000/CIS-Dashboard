// Modules
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { editSubeventoApi, getSubeventosApi, registerSubeventoApi, removeSubventoApi } from '../api/subevento';

// Hooks
import useSelectors from '../hooks/useSelectors';
import useBindActions from '../hooks/useBindActions';

// Types
import { SubEventBodyFromDBWithId } from '../types/subeventos';

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
        const mapedSubevents = subevents.map(({ type, id, event, speakers, ...restSubevent }) => ({ 
          ...restSubevent, 
          // @ts-ignore
          type:String(type.id), 
          id: String(id), 
          event:String(event),
          // @ts-ignore
          speakers: speakers.map(({ id }) => (String(id))), 
        }));
        setSubeventos(mapedSubevents);
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

        const { 
          description, 
          endDate, 
          eventId, 
          flyer, 
          platforms, 
          initDate, 
          name, 
          speakers, 
          type ,
          hasRegistration
        } = previousData;

        const cleanSubevent:SubEventBodyFromDBWithId = {
          description,
          endDate,
          event:eventId,
          flyer,
          platforms,
          id:data.id,
          initDate,
          name,
          speakers,
          type,
          hasRegistration
        }

        const newEventos = [ ...subeventos, cleanSubevent ];
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
      onSuccess: (_, previousData) => {

        const { 
          description, 
          endDate, 
          eventId, 
          flyer, 
          platforms, 
          id, 
          initDate, 
          name, 
          speakers, 
          type,
          hasRegistration 
        } = previousData;

        const cleanSubeventFromDb:SubEventBodyFromDBWithId = {
          description,
          endDate,
          event:eventId,
          flyer,
          platforms,
          id,
          initDate,
          name,
          speakers,
          type,
          hasRegistration
        }
        const newEventos = subeventos.map(({ id, ...restEvento }) => {
          if (id === previousData.id) return cleanSubeventFromDb;
          return { id, ...restEvento };
        })
        setSubeventos(newEventos);
        afterSubmit(true);
        showSnackMessage('Ponente editado');
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
