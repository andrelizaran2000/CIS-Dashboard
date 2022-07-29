// Modules
import { useNavigate } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

// Api
import { loginApi } from '../api/user';

// Hooks
import useBindActions from '../hooks/useBindActions';

// Components
import PaperFormContainer from '../components/forms/PaperFormContainer';

// Hooks
import useForm from '../hooks/useForm';

// Types
import { LoginBody } from '../types/user';
import useUserQueries from '../queries/useUserQueries';

const initialState = {
  userName:'dumb-user',
  password:'12345'
}

export default function Login () {

  const { formValues, handleFormValues } = useForm(initialState);
  const emailFormValues = formValues as LoginBody;
  const { loginMutation } = useUserQueries();
  const { mutate, isLoading } = loginMutation();

  return (
    <Grid container sx={{ height:'100vh' }}>
      <Grid item xs={0}  md={6} lg={8} sx={{ backgroundColor:blue[600] }}/>
      <Grid item xs={12} md={6} lg={4} sx={secondChildStyles}>
        <PaperFormContainer 
          primaryButtonText='Entrar' 
          title='Iniciar sesión' 
          onSubmit={() => mutate(emailFormValues)} 
          isLoading={isLoading} 
          cleanForm={() => {}} 
        >
          <TextField
            type='text'
            label='Nomber de usuario'
            onChange={handleFormValues}
            name='userName'
            value={emailFormValues.userName}
            autoComplete='off'
            disabled={isLoading}
          />
          <TextField 
            type='password'
            label='Contraseña'
            onChange={handleFormValues}
            name='password'
            value={emailFormValues.password}
            autoComplete='off'
            disabled={isLoading}
          />
        </PaperFormContainer>
      </Grid>
    </Grid>
  )
}

// Styles
const secondChildStyles = {
  backgroundColor:grey[200], 
  display:'flex', 
  flexDirection:'column', 
  justifyContent:'center',
  padding: { xs:2, sm:6, xl:8 }
}