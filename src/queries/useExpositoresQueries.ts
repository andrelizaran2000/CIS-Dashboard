// Modules
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { getExpositoresApi, registerExpositorApi, editExpositorApi, removeExpositorApi } from '../api/expositores';

// Hooks
import useSelectors from '../hooks/useSelectors';
import useBindActions from '../hooks/useBindActions';

export default function useExpositoresQueries() {

	const { register } = useSelectors();
	const { expositores } = register;
	const { registerBindedActions, uiBindedActions } = useBindActions();
	const { setExpositores } = registerBindedActions;
	const { showSnackMessage } = uiBindedActions;

	function getExpositoresQuery () {
		return useQuery(['get-expositores'], getExpositoresApi, {
			onSuccess: ({ data }) => {
				const { speakers } = data;
				const newSpeakers = speakers.map(({ id, ...restSpeaker }) => ({ ...restSpeaker, id:String(id) }));
				setExpositores(newSpeakers);
			},
			onError: () => {
				showSnackMessage('Error obteniendo ponente');
			},
			enabled:false
		});
	}

	function registerExpositorMutation (afterSubmit: (isEditMode:boolean) => void) {
		return useMutation(registerExpositorApi, {
			onSuccess: ({ data }, previousData) => {
				const { id } = data;
				const newExpositores = [ ...expositores, { ...previousData, id }];
      	setExpositores(newExpositores);
      	showSnackMessage('Nuevo ponente registrado');
				afterSubmit(false);
			},
			onError: () => {
				showSnackMessage('Error registrando ponente');
			}
		});
	}

	function editExpositorMutation (afterSubmit: (isEditMode:boolean) => void) {
		return useMutation(editExpositorApi, {
			onSuccess: (_, previousData) => {		
				const newExpositores = expositores.map(({ id, ...restExpositor }) => {
					if (id === previousData.id) return previousData;
					return { id, ...restExpositor };
				});
				setExpositores(newExpositores);
				showSnackMessage('Ponente editado');
				afterSubmit(true);
			},
			onError: () => {
				showSnackMessage('Error editando ponente');
			}
		})
	}

	function removeExpositorMutation () {
		return useMutation(removeExpositorApi, {
			onSuccess: (_, idSelected) => {
				const newExpositores = expositores.filter((expositor) => {
					if (expositor.id !== idSelected) return expositor;
				});
				setExpositores(newExpositores);
				showSnackMessage('Ponente eliminado');
			},
			onError: () => {
				showSnackMessage('Error eliminando ponente');
			}
		});
	}

	return {
		getExpositoresQuery,
		registerExpositorMutation,
		editExpositorMutation,
		removeExpositorMutation
	}

}
