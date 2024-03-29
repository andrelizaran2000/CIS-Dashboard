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
  Chip, 
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const initialStateBlank:EventoBodyWithId = {
  id:'0',
  title:'',
  description:'',
  initDate:'',
  endDate:'',
  flyer1:'',
  flyer2:'',
  hasRegistration:true
}

export default function Eventos() {

  const { 
    formValues, 
    handleImageSelector, 
    handleFormValues, 
    setFormValues, 
    handleSwitch 
  } = useForm(initialStateBlank);
  const eventoFormValues = formValues as EventoBodyWithId;

  const { ui } = useSelectors();
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;

  // Queries
  const { registerEventoMutation, editEventoMutation } = useEventosQueries();
  const { mutate:registerEvento, isLoading:isRegisteringEvento } = registerEventoMutation(cleanForm);
  const { mutate:editEvento, isLoading:isEditingEvento } = editEventoMutation(cleanForm);

  function validateForm () {
    const { description, endDate, flyer1, flyer2, initDate, title } = eventoFormValues;
    if (description && endDate && flyer1 && flyer2 && initDate && title) return true;
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
            multiline
            rows={4}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>
          <CustomImageSelector 
            label='Flyer 1 de evento' 
            inputName='flyer1' 
            handleImageSelector={handleImageSelector}
            value={eventoFormValues.flyer1}
            disabled={isRegisteringEvento || isEditingEvento}
          />
          <CustomImageSelector 
            label='Flyer 2 de evento' 
            inputName='flyer2' 
            handleImageSelector={handleImageSelector}
            value={eventoFormValues.flyer2}
            disabled={isRegisteringEvento || isEditingEvento}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='hasRegistration'
            label='Registro disponible'
            value={eventoFormValues.hasRegistration}
            disabled={isRegisteringEvento || isEditingEvento}
          />
        </PaperFormContainer>
      </Grid>
      <EventosList setFormValues={setFormValues} isLoadingAction={isRegisteringEvento || isEditingEvento}/>
    </>
  )
}

function EventosList ({ setFormValues, isLoadingAction }:any) {

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
            const { description, endDate, flyer1, initDate, title, id } = evento;
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
                    image={flyer1}
                  />
                  <CardContent sx={{ backgroundColor:grey[100] }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" mb={2}>Descripción: {description}</Typography>
                    <Stack alignItems='start' rowGap={1}>
                      <Chip icon={<CalendarTodayIcon fontSize='small'/>} sx={{ padding:1 }} label={`Fecha de inicio: ${initDate}`}/>
                      <Chip icon={<CalendarTodayIcon fontSize='small'/>} sx={{ padding:1 }} label={`Fecha de cierre: ${endDate}`}/>
                    </Stack>
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
        {(!eventos.length) && <Alert severity='warning'>No hay eventos registrados</Alert>}
      </PaperContainer>
    </Grid>
  )
}

