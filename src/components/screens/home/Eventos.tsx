// Modules
import { useEffect } from 'react';
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
  Stack, 
  TextField, 
  Typography } from '@mui/material';
  
// Styles
import { allWidth } from '../../containers/ColorContainer';

// Types
import { EventoBodyWithId } from '../../../types/eventos';

// Hooks
import useForm from '../../../hooks/useForm';
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';
import useEventosQueries from '../../../queries/useEventosQueries';

// Components
import CustomSwitch from '../../forms/CustomSwitch';
import PaperContainer from '../../containers/PaperContainer';
import PaperFormContainer from '../../forms/PaperFormContainer';
import CustomImageSelector from '../../forms/CustomImageSelector';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const initialState:EventoBodyWithId = {
  id:0,
  title:'JS & TS',
  description:'Sit eu veniam occaecat enim culpa voluptate incididunt ea deserunt incididunt labore aliqua occaecat.',
  initDate:'',
  endDate:'',
  flyer:'https://firebasestorage.googleapis.com/v0/b/cis-frontend-81086.appspot.com/o/1_9XMpTyccrky0eW5Wz6DoWQ.png?alt=media&token=bd82a2bd-4291-40c2-8aca-e614bc27794f',
  register:true
}

const initialStateBlank:EventoBodyWithId = {
  id:0,
  title:'',
  description:'',
  initDate:'',
  endDate:'',
  flyer:'',
  register:true
}

export default function Eventos() {

  const { 
    formValues, 
    handleImageSelector, 
    handleFormValues, 
    setFormValues, 
    handleSwitch 
  } = useForm(initialState);
  const eventoFormValues = formValues as EventoBodyWithId;

  const { ui } = useSelectors();
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;

  // Queries
  const { getEventosQuery, registerEventoMutation, editEventoMutation } = useEventosQueries();
  const { refetch:getEventos, isLoading:isGettingEventos } = getEventosQuery();
  const { mutate:registerEvento, isLoading:isRegisteringEvento } = registerEventoMutation(cleanForm);
  const { mutate:editEvento, isLoading:isEditingEvento } = editEventoMutation(cleanForm);

  useEffect(() => {
    getEventos();
  }, []);

  function validateForm () {
    const { description, endDate, flyer, initDate, title } = eventoFormValues;
    if (description && endDate && flyer && initDate && title) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  function onSubmit () {
    if (!validateForm()) return;
    if (isEditMode) editEvento(eventoFormValues); 
    else {
      const { id, ...restEvento } = eventoFormValues;
      registerEvento(restEvento); 
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
          isLoading={isRegisteringEvento || isEditingEvento}
          primaryButtonText={isEditMode ? 'Editar' : 'Registrar'} 
          title={isEditMode ? 'Editar evento' : 'Registrar eventos' }
          onSubmit={onSubmit}
          cleanForm={() => cleanForm(true)}
        >
          <TextField
            label='Título de evento'
            type='text'
            autoComplete='off'
            value={eventoFormValues.title}
            onChange={handleFormValues}
            name='title'
            disabled={isRegisteringEvento || isEditingEvento}
          />
          <TextField
            label='Descripción del subevento'
            type='text'
            autoComplete='off'
            value={eventoFormValues.description}
            onChange={handleFormValues}
            name='description'
            disabled={isRegisteringEvento || isEditingEvento}
          />
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de inicio</Typography>
            <TextField
              type='date'
              value={eventoFormValues.initDate}
              onChange={handleFormValues}
              name='initDate'
              disabled={isRegisteringEvento || isEditingEvento}
            />
          </Stack>
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de cierre</Typography>
            <TextField
              type='date'
              value={eventoFormValues.endDate}
              onChange={handleFormValues}
              name='endDate'
              disabled={isRegisteringEvento || isEditingEvento}
            />
          </Stack>
          <CustomImageSelector 
            label='Flyer de evento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={eventoFormValues.flyer}
            disabled={isRegisteringEvento || isEditingEvento}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='register'
            label='Registro disponible'
            value={eventoFormValues.register}
            disabled={isRegisteringEvento || isEditingEvento}
          />
        </PaperFormContainer>
      </Grid>
      <EventosList setFormValues={setFormValues} isLoading={isGettingEventos} isLoadingAction={isRegisteringEvento || isEditingEvento}/>
    </>
  )
}

function EventosList ({ setFormValues, isLoading, isLoadingAction }:any) {

  const { register, ui } = useSelectors();
  const { eventos } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;
  const { removeEventoMutation } = useEventosQueries();
  const { mutate, isLoading:isRemovingEvento } = removeEventoMutation();

  function editEvento (evento:EventoBodyWithId) {
    setFormValues(evento);
    !isEditMode && toggleEditMode();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  return (
    <Grid item xs={12} lg={6} sx={{ display:'flex', flexDirection:'column' }}>
      <PaperContainer title='Eventos guardados'>
        <Grid container spacing={2}>
          {eventos.map((evento, index) => {
            const { description, endDate, flyer, initDate, title, id } = evento;
            return (
              <Grid item xs={12} md={6} lg={12} xl={6} key={index}>
                <Card>
                  <CardHeader
                    avatar={<Avatar>{title[0]}</Avatar>}
                    title={title}
                    subheader={title}
                  />
                  <CardMedia
                    component="img"
                    height="120"
                    image={flyer}
                  />
                  <CardContent sx={{ backgroundColor:grey[100] }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ backgroundColor:grey[100] }}>
                    <IconButton onClick={() => { editEvento(evento)}} disabled={isRemovingEvento || isLoadingAction}> 
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton onClick={() => mutate(id)} disabled={isRemovingEvento || isLoadingAction}>
                      <DeleteIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {(!eventos.length && !isLoading) && <Alert severity='warning'>No hay eventos registrados</Alert>}
        {isLoading && <Alert severity='info'>Cargando eventos</Alert>}
      </PaperContainer>
    </Grid>
  )
}