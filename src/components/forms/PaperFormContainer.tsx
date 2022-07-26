// Modules
import { ReactNode } from 'react';
import { grey } from '@mui/material/colors';
import { Button, Paper, Stack, Typography } from '@mui/material';

// Hooks
import useSelectors from '../../hooks/useSelectors';

type Props = {
  title:string;
  children:ReactNode;
  primaryButtonText:string;
  onSubmit: () => Promise<void>;
  cleanForm: () => void;
}

export default function PaperFormContainer({ title, children, primaryButtonText, onSubmit, cleanForm }:Props) {
  const { ui } = useSelectors();
  const { isEditMode } = ui;
  return (
    <Paper sx={{ p:2 }} component='form' onSubmit={(e:any) => {e.preventDefault(); onSubmit() }}>
      <Stack rowGap={2}>
        <Typography variant='h6' mb={1} color={grey[700]}>{title}</Typography>
        {children}
        {isEditMode && <Button variant='contained' type='submit' color='error' onClick={() => cleanForm()}>Limpiar</Button>}
        <Button variant='contained' type='submit'>{primaryButtonText}</Button>
      </Stack>
    </Paper>
  )
}
