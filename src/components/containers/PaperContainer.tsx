// Modules
import { ReactNode } from 'react';
import { grey } from '@mui/material/colors';
import { Paper, Stack, Typography } from '@mui/material';

type Props = {
  title:string;
  children:ReactNode;
}

export default function PaperContainer ({ title, children }:Props) {
  return (
    <Paper sx={{ p:2 }}>
      <Stack rowGap={2}>
        <Typography variant='h6' color={grey[700]}>{title}</Typography>
        {children}
      </Stack>
    </Paper>
  )
}
