// Modules
import { Alert, Grid, TextField } from '@mui/material';

// Hooks
import useForm from '../../../hooks/useForm';

// Styles
import { allWidth } from '../../containers/ColorContainer';

// Components
import PaperFormContainer from '../../forms/PaperFormContainer';
import CustomImageSelector from '../../forms/CustomImageSelector';

// Types
import { MiembroBody } from '../../../types/miembros';
import PaperContainer from '../../containers/PaperContainer';

export default function Miembros() {

  const initialStateBlank:MiembroBody = {
    firstName:'',
    lastName:'',
    profilePhoto:{}
  }

  function onSubmit () {}

  const { formValues, handleFormValues, handleImageSelector } = useForm(initialStateBlank);
  const miembrosFormValues = formValues as MiembroBody;

  return (
    <>
      <Grid item xs={12} lg={6} sx={allWidth}>
        <PaperFormContainer primaryButtonText='Registrar' title='Registrar miembros' onSubmit={onSubmit}>
          <TextField 
            label='Nombre de miembro'
            type='text'
            autoComplete='off'
            value={miembrosFormValues.firstName}
            onChange={handleFormValues}
            name='title'
          />
          <TextField
            label='Apellidos de miembro'
            type='text'
            autoComplete='off'
            value={miembrosFormValues.lastName}
            onChange={handleFormValues}
            name='description'
          />
          <CustomImageSelector 
            label='Foto de perfil' 
            inputName='profilePhoto' 
            handleImageSelector={handleImageSelector}
          />
        </PaperFormContainer>
      </Grid>
      <MiembrosList/>
    </>
  )
}

function MiembrosList () {
  return (
    <Grid item xs={12} lg={6} sx={{ display:'flex', flexDirection:'column' }}>
      <PaperContainer title='Miembros guardados' >
        <Alert severity="error">No hay miembros guardados</Alert>
      </PaperContainer>
    </Grid>
  )
}