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
import { 
  editExpositorApi, 
  getExpositoresApi, 
  registerExpositorApi, 
  removeExpositorApi 
} from '../../../api/expositores';

// Styles
import { allWidth } from '../../../components/containers/ColorContainer';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Hooks
import useForm from '../../../hooks/useForm';
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';
import useExpositoresQueries from '../../../queries/useExpositoresQueries';

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

  const { 
    formValues, 
    handleSwitch, 
    handleFormValues, 
    handleImageSelector, 
    setFormValues 
  } = useForm(initialStateBlank);
  const expositorFormValues = formValues as ExpositorBodyWithId;

  const { ui } = useSelectors();
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;

  // Queries
  const { getExpositoresQuery, registerExpositorMutation, editExpositorMutation } = useExpositoresQueries();
  const { refetch:getExpositores, isLoading:isGettingExpositores } = getExpositoresQuery();
  const { mutate:registerExpositor, isLoading:isRegisteringExpositor } = registerExpositorMutation(cleanForm);
  const { mutate:editExpositor, isLoading:isEditingExpositor } = editExpositorMutation(cleanForm);
  
  useEffect(() => {
    getExpositores();
  }, []);

  function validateForm () {
    const { coverPhoto, description, firstName, lastName, profilePhoto, title } = expositorFormValues;
    if (coverPhoto && description && firstName && lastName && profilePhoto && title) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  function onSubmit () {
    if (!validateForm()) return;
    if (isEditMode) editExpositor(expositorFormValues); 
    else {
      const { id, ...restExpositor } = expositorFormValues;
      registerExpositor(restExpositor); 
    }
  }

  function cleanForm (isEditMode:boolean) {
    setFormValues(initialStateBlank);
    isEditMode && toggleEditMode();
  }

  return (
    <>
      <Grid item xs={12} lg={6} sx={allWidth}>
        <PaperFormContainer 
          primaryButtonText={isEditMode ? 'Editar' : 'Registrar'} 
          title={isEditMode ? 'Editar ponente' : 'Registrar ponente'} 
          onSubmit={onSubmit}
          cleanForm={() => cleanForm(true)}
          isLoading={isRegisteringExpositor || isEditingExpositor}
        >
          <TextField
            label='Nombre de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.firstName}
            onChange={handleFormValues}
            name='firstName'
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
          <TextField
            label='Apellido de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.lastName}
            onChange={handleFormValues}
            name='lastName'
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
          <TextField
            label='Descripción de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.description}
            onChange={handleFormValues}
            name='description'
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
          <TextField
            label='Título de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.title}
            onChange={handleFormValues}
            name='title'
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
          <CustomImageSelector 
            label='Foto de perfil' 
            inputName='profilePhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.profilePhoto}
            disabled={isRegisteringExpositor || isEditingExpositor}
          /> 
          <CustomImageSelector 
            label='Foto de portada' 
            inputName='coverPhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.coverPhoto}
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='visible'
            label='Expositor visible'
            value={expositorFormValues.visible}
            disabled={isRegisteringExpositor || isEditingExpositor}
          />
        </PaperFormContainer>
      </Grid>
      <ExpositoresList 
        setFormValues={setFormValues} 
        isLoading={isGettingExpositores} 
        isLoadingAction={isRegisteringExpositor || isEditingExpositor}
      />
    </>
  )
}


function ExpositoresList ({ setFormValues, isLoading, isLoadingAction }:any) {

  const { register, ui } = useSelectors();
  const { expositores } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;
  const { removeExpositorMutation } = useExpositoresQueries();
  const { mutate, isLoading:isRemovingExpositor } = removeExpositorMutation();

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
            const { title, firstName, lastName, description, coverPhoto, profilePhoto, id } = expositor;
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
                    <IconButton onClick={() => editExpositor(expositor)} disabled={isLoadingAction || isRemovingExpositor}> 
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton onClick={() => mutate(id)} disabled={isLoadingAction || isRemovingExpositor}>
                      <DeleteIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {(!expositores.length && !isLoading) && <Alert severity='warning'>No hay expositores registrados</Alert>}
        {isLoading && <Alert severity='info'>Cargando expositores</Alert>}
      </PaperContainer>
    </Grid>
  )
}