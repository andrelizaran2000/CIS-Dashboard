// Modules
import { Snackbar } from '@mui/material'

// Hooks 
import useSelectors from '../../hooks/useSelectors';
import useBindActions from '../../hooks/useBindActions';

export default function SnackContainer ({ children }:any) {

	const { uiBindedActions } = useBindActions(); 
	const { hideSnackMessage } = uiBindedActions;
	const { ui } = useSelectors();
	const { snackMessage } = ui;

  return (
    <>
			{children}
			<Snackbar
				open={snackMessage.length > 0}
				autoHideDuration={6000}
				onClose={hideSnackMessage}
				message={snackMessage}
			/>
    </>
  )
}
