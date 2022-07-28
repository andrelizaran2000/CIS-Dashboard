// Modules
import { useMutation, useQuery } from '@tanstack/react-query';

// Api
import { getExpositoresApi, registerExpositorApi, editExpositorApi } from '../api/expositores';

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
				setExpositores(speakers);
			},
			onError: () => {
				showSnackMessage('Error obteniendo ponente');
			}
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
				showSnackMessage('Error registrando ponente');
			}
		})
	}

	return {
		getExpositoresQuery,
		registerExpositorMutation,
		editExpositorMutation
	}

}
