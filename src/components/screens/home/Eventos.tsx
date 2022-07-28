// Modules
import { useState } from 'react';
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

// Components
import CustomSwitch from '../../forms/CustomSwitch';
import PaperContainer from '../../containers/PaperContainer';
import PaperFormContainer from '../../forms/PaperFormContainer';
import CustomImageSelector from '../../forms/CustomImageSelector';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Api
import { editEventoApi, registerEventoApi } from '../../../api/eventos';

const initialStateBlank:EventoBodyWithId = {
  id:0,
  title:'JS & TS',
  description:'Sit eu veniam occaecat enim culpa voluptate incididunt ea deserunt incididunt labore aliqua occaecat.',
  initDate:'',
  endDate:'',
  flyer:'https://firebasestorage.googleapis.com/v0/b/cis-frontend-81086.appspot.com/o/1_9XMpTyccrky0eW5Wz6DoWQ.png?alt=media&token=bd82a2bd-4291-40c2-8aca-e614bc27794f',
  register:true
}

export default function Eventos() {

  const { formValues, handleImageSelector, handleFormValues, setFormValues, handleSwitch } = useForm(initialStateBlank);
  const eventoFormValues = formValues as EventoBodyWithId;
  const { uiBindedActions, registerBindedActions } = useBindActions();
  const { setEventos } = registerBindedActions;
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const { ui, register } = useSelectors();
  const { isEditMode } = ui;
  const { eventos } = register;
  const [ isLoading, setIsLoading ] = useState(false);

  function validateForm () {
    const { description, endDate, flyer, initDate, title } = eventoFormValues;
    if (description && endDate && flyer && initDate && title) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  async function onSubmitRegister () {
    if (!validateForm()) return;
    const { id, ...eventoRest } = eventoFormValues;
    await registerEventoApi(eventoRest);
    const newEventos = [eventoFormValues, ...eventos];
    setEventos(newEventos);
    showSnackMessage('Nuevo evento registrado');
    setFormValues(initialStateBlank);
  }

  async function onSubmitEdit () {
    try {
      if (!validateForm()) return;
      await editEventoApi(eventoFormValues);
      const newEventos = eventos.map(({ id, ...restEvent }) => {
        if (id === eventoFormValues.id) return eventoFormValues;
        return { id, ...restEvent };
      });
      setEventos(newEventos);
      showSnackMessage('Evento editado');
      setFormValues(initialStateBlank);
    } catch (error:any) {
      console.log(error.response);
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
          isLoading={isLoading}
          primaryButtonText='Registrar' 
          title='Registrar eventos' 
          onSubmit={() => isEditMode ? onSubmitEdit() : onSubmitRegister()}
          cleanForm={cleanForm}
        >
          <TextField
            label='Título de evento'
            type='text'
            autoComplete='off'
            value={eventoFormValues.title}
            onChange={handleFormValues}
            name='title'
            disabled={isLoading}
          />
          <TextField
            label='Descripción del subevento'
            type='text'
            autoComplete='off'
            value={eventoFormValues.description}
            onChange={handleFormValues}
            name='description'
            disabled={isLoading}
          />
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de inicio</Typography>
            <TextField
              type='date'
              value={eventoFormValues.initDate}
              onChange={handleFormValues}
              name='initDate'
              disabled={isLoading}
            />
          </Stack>
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de cierre</Typography>
            <TextField
              type='date'
              value={eventoFormValues.endDate}
              onChange={handleFormValues}
              name='endDate'
              disabled={isLoading}
            />
          </Stack>
          <CustomImageSelector 
            label='Flyer de evento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={eventoFormValues.flyer}
            disabled={isLoading}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='register'
            label='Registro disponible'
            value={eventoFormValues.register}
            disabled={isLoading}
          />
        </PaperFormContainer>
      </Grid>
      <EventosList setFormValues={setFormValues}/>
    </>
  )
}

function EventosList ({ setFormValues }:any) {

  const { register, ui } = useSelectors();
  const { eventos } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;

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
            const { description, endDate, flyer, initDate, title } = evento;
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
                    <IconButton onClick={() => { editEvento(evento)}}> 
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
        {!eventos.length && <Alert severity='warning'>No hay eventos registrados</Alert>}
      </PaperContainer>
    </Grid>
  )
}