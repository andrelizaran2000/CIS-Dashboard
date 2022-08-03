// Modules
import { useMutation, useQuery } from "@tanstack/react-query"

// Api
import { editEventoApi, getEventosApi, registerEventoApi, removeEventoApi } from "../api/eventos"

// Hooks
import useSelectors from "../hooks/useSelectors";
import useBindActions from "../hooks/useBindActions";

export default function useEventosQueries() {

  const { uiBindedActions, registerBindedActions } = useBindActions();
  const { showSnackMessage } = uiBindedActions;
  const { setEventos } = registerBindedActions
  const { register } = useSelectors();
  const { eventos } = register;

  function getEventosQuery () {
    return useQuery(['get-eventos'], getEventosApi, {
      onSuccess: ({ data }) => {
        const { events } = data;
        const newEvents = events.map(({ id, ...restEvent }) => ({ ...restEvent, id:String(id) }));
        setEventos(newEvents);
      },
      onError: () => {
        showSnackMessage('Error obteniendo ponente');
      },
      enabled:false
    });
  }

  function registerEventoMutation (afterSubmit: (isEditMode:boolean) => void) {
    return useMutation(registerEventoApi, {
      onSuccess:({ data }, previousData) => {
        const { id } = data;
        const newEventos = [ ...eventos, {  ...previousData, id }];
        setEventos(newEventos);
        showSnackMessage('Nuevo evento registrado');
				afterSubmit(false);
      },
      onError: () => {
        showSnackMessage('Error registrando evento');
      }
    });
  }

  function editEventoMutation (afterSubmit: (isEditMode:boolean) => void) {
    return useMutation(editEventoApi, {
      onSuccess: (_, previousData) => {
        const newEventos = eventos.map(({ id, ...restEvento }) => {
          if (id === previousData.id) return previousData;
          return { id, ...restEvento };
        })
        setEventos(newEventos);
        showSnackMessage('Evento editado');
				afterSubmit(true);
      },
      onError: () => {
        showSnackMessage('Error editando evento');
      }
    })
  }

  function removeEventoMutation () {
    return useMutation(removeEventoApi, {
      onSuccess: (_, idSelected) => {
        const newEventos = eventos.filter((evento) => {
					if (evento.id !== idSelected) return evento;
				});
        setEventos(newEventos);
				showSnackMessage('Ponente eliminado');
      },
      onError: () => {
        showSnackMessage('Error removiendo evento');
      } 
    });
  }
  
  return {
    getEventosQuery,
    registerEventoMutation,
    editEventoMutation,
    removeEventoMutation
  }

}
