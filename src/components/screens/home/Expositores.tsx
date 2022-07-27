// Modules
import { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { 
  Alert, 
  Avatar, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  Grid, 
  IconButton, 
  TextField, 
  Typography 
} from '@mui/material';

// Types
import { ExpositorBodyWithId } from '../../../types/expositor';

// Components
import CustomSwitch from '../../../components/forms/CustomSwitch';
import CustomImageSelector from '../../forms/CustomImageSelector';
import PaperContainer from '../../../components/containers/PaperContainer';
import PaperFormContainer from '../../../components/forms/PaperFormContainer';

// Api
import { editExpositor, getExpositoresApi, registerExpositor } from '../../../api/expositores';

// Styles
import { allWidth } from '../../../components/containers/ColorContainer';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Hooks
import useForm from '../../../hooks/useForm';
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';

const initialState:ExpositorBodyWithId = {
  id:0,
  firstName:'Andre',
  lastName:'Lizarán',
  description:'Adipisicing ex in ad deserunt cillum nostrud eiusmod.',
  title:'Frontend Dev',
  visible:true,
  profilePhoto:'https://firebasestorage.googleapis.com/v0/b/cis-frontend-81086.appspot.com/o/IMG_1063.JPG?alt=media&token=ad98b7a9-c094-40ac-9b45-77fd2bc5037b',
  coverPhoto:'https://firebasestorage.googleapis.com/v0/b/cis-frontend-81086.appspot.com/o/materialdesign-1-645x300.jpg?alt=media&token=b6411acf-ce22-4603-beac-c5ae061b862e',
}

const initialStateBlank:ExpositorBodyWithId = {
  id:0,
  firstName:'',
  lastName:'',
  description:'',
  title:'',
  visible:true,
  profilePhoto:'',
  coverPhoto:'',
}

export default function Expositores () {

  const { formValues, handleSwitch, handleFormValues, handleImageSelector, setFormValues } = useForm(initialState);
  const expositorFormValues = formValues as ExpositorBodyWithId;
  const { ui, register } = useSelectors();
  const { expositores } = register;
  const { isEditMode } = ui;
  const { uiBindedActions, registerBindedActions } = useBindActions();
  const { setExpositores } = registerBindedActions;
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    getExpositores()
  }, []);

  async function getExpositores () {
    try {
      const { data } = await getExpositoresApi();
      const { speakers } = data;
      setExpositores(speakers);
    } catch (error:any) {
      console.log(error)
    }
  }

  function validateForm () {
    const { coverPhoto, description, firstName, lastName, profilePhoto, title } = expositorFormValues;
    if (coverPhoto && description && firstName && lastName && profilePhoto && title) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  async function onSubmitRegister () {
    try {
      if (!validateForm()) return;
      setIsLoading(true)
      const { id, ...expositorRest } = expositorFormValues;
      await registerExpositor(expositorRest);
      const newExpositores = [ ...expositores, expositorFormValues];
      setExpositores(newExpositores);
      showSnackMessage('Nuevo ponente registrado');
      setFormValues(initialStateBlank);
      setIsLoading(false)
    } catch (error:any) {
      console.log(error.response);
      setIsLoading(false);
    }
  }

  async function onSubmitEdit () {
    try {
      if (!validateForm()) return;
      setIsLoading(true)
      await editExpositor(expositorFormValues);
      const newExpositores = expositores.map(({ id, ...restExpositor }) => {
        if (id === expositorFormValues.id) return expositorFormValues;
        return { id, ...restExpositor };
      });
      setExpositores(newExpositores);
      showSnackMessage('Ponente editado');
      setFormValues(initialStateBlank);
      setIsLoading(false);
    } catch (error:any) {
      console.log(error.response);
      setIsLoading(false);
    }
  }

  function cleanForm () {
    setFormValues(initialStateBlank);
    toggleEditMode();
  }

  return (
    <>
      <Grid item xs={12} lg={6} sx={allWidth}>
        <PaperFormContainer 
          primaryButtonText={isEditMode ? 'Editar' : 'Registrar'} 
          title={isEditMode ? 'Editar expositor' : 'Registrar expositor'} 
          onSubmit={() => isEditMode ? onSubmitEdit() : onSubmitRegister()}
          cleanForm={cleanForm}
          isLoading={isLoading}
        >
          <TextField
            label='Nombre de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.firstName}
            onChange={handleFormValues}
            name='firstName'
            disabled={isLoading}
          />
          <TextField
            label='Apellido de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.lastName}
            onChange={handleFormValues}
            name='lastName'
            disabled={isLoading}
          />
          <TextField
            label='Descripción de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.description}
            onChange={handleFormValues}
            name='description'
            disabled={isLoading}
          />
          <TextField
            label='Título de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.title}
            onChange={handleFormValues}
            name='title'
            disabled={isLoading}
          />
          <CustomImageSelector 
            label='Foto de perfil' 
            inputName='profilePhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.profilePhoto}
            disabled={isLoading}
          /> 
          <CustomImageSelector 
            label='Foto de portada' 
            inputName='coverPhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.coverPhoto}
            disabled={isLoading}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='visible'
            label='Expositor visible'
            value={expositorFormValues.visible}
            disabled={isLoading}
          />
        </PaperFormContainer>
      </Grid>
      <ExpositoresList setFormValues={setFormValues}/>
    </>
  )
}


function ExpositoresList ({ setFormValues }:any) {

  const { register, ui } = useSelectors();
  const { expositores } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;

  function editExpositor (expositor:ExpositorBodyWithId) {
    setFormValues(expositor);
    !isEditMode && toggleEditMode();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  return (
    <Grid item xs={12} lg={6} sx={{ display:'flex', flexDirection:'column' }}>
      <PaperContainer title='Expositores guardados'>
        <Grid container spacing={2}>     
          {expositores.map((expositor, index) => {
            const { title, firstName, lastName, description, coverPhoto, profilePhoto } = expositor;
            return (
              <Grid item xs={12} md={6} lg={12} xl={6} key={index}>
                <Card>
                  <CardHeader
                    avatar={<Avatar src={profilePhoto}/>}
                    title={`${firstName} ${lastName}`}
                    subheader={title}
                  />
                  <CardMedia
                    component="img"
                    height="120"
                    image={coverPhoto}
                  />
                  <CardContent sx={{ backgroundColor:grey[100] }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ backgroundColor:grey[100] }}>
                    <IconButton onClick={() => editExpositor(expositor)}> 
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton>
                      <DeleteIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {!expositores.length && <Alert severity='warning'>No hay expositores registrados</Alert>}
      </PaperContainer>
    </Grid>
  )
}