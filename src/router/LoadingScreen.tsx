// Modules
import { grey } from '@mui/material/colors';
import { CircularProgress, Stack } from '@mui/material';

export default function LoadingScreens() {
  return (
    <Stack 
      direction='column' 
      justifyContent='center' 
      alignItems='center' 
      sx={{ backgroundColor:grey[200], height:'100vh' }}
    >
      <CircularProgress />
    </Stack>
  )
}
