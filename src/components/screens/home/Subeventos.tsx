// Modules
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { 
  Alert, 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  Checkbox, 
  Chip, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemButton, 
  ListItemText, 
  Stack, 
  TextField, 
  Typography 
} from '@mui/material';

// Components
import CustomSelect from '../../forms/CustomSelect';
import PaperContainer from '../../containers/PaperContainer';
import PaperFormContainer from '../../forms/PaperFormContainer';
import CustomImageSelector from '../../forms/CustomImageSelector';

// Hooks
import useForm from '../../../hooks/useForm';
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';
import useSubeventosQueries from '../../../queries/useSubeventosQueries';

// Styles
import { allWidth } from '../../containers/ColorContainer'

// Types
import { SubeventoBodyWithId, SubeventoBodyToDb, SubeventBodyFromDB, SubEventBodyFromDBWithId } from '../../../types/subeventos';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const initialStateBlank:SubeventoBodyWithId = {
  id:'0',
  name:'',
  description:'',
  initHour:'07:30',
  initDate:'2022-01-01',
  endHour:'09:30',
  endDate:'',
  flyer:'',
  type:'1',
  eventId:'1',
  formEvent:'',
  formSubevent:'',
  speakers:[]
}

const initialState:SubeventoBodyWithId = {
  id:'0',
  name:'Aprende JS desde cero',
  description:'Generic description',
  initHour:'07:30',
  initDate:'2022-01-01',
  endHour:'09:30',
  endDate:'',
  flyer:'https://somospnt.com/images/blog/articulos/1A-Typescript/js-ts.png',
  type:'1',
  eventId:'1',
  formEvent:'',
  formSubevent:'',
  speakers:[]
}

export default function Subeventos() {

  const { 
    formValues, 
    handleFormValues, 
    handleImageSelector, 
    setFormValues, 
    handleSelect,
  } = useForm(initialState);
  
  const subeventoFormValues = formValues as SubeventoBodyWithId;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const { ui } = useSelectors();
  const { isEditMode } = ui;

  // Queries
  const { editSubeventoMutation, registerSubeventoMutation } = useSubeventosQueries();
  const { mutate:editSubevento, isLoading:isEditingSubevento } = editSubeventoMutation(cleanForm);
  const { mutate:registerSubevento, isLoading:isRegisteringSubevento } = registerSubeventoMutation(cleanForm);

  function validateForm () {
    const { name, description, initDate, initHour, endHour, flyer, formEvent, formSubevent, speakers } = subeventoFormValues;
    if (name && description && initDate && flyer && initHour && endHour && formEvent && formSubevent && speakers.length > 0) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  function onSubmit () {
    if (!validateForm()) return;
    const { name, description, initDate, initHour, endHour, flyer, type, formEvent, formSubevent, eventId, speakers, id } = subeventoFormValues;
    const subeventoBodyToDb:SubeventoBodyToDb = {
      type,
      name,
      description,
      initDate: `${initDate} ${initHour}`,
      endDate: `${initDate} ${endHour}`,
      flyer,
      formEvent,
      formSubevent,
      speakers,
      eventId
    }
    if (isEditMode) editSubevento({ ...subeventoBodyToDb, id }); 
    else registerSubevento(subeventoBodyToDb); 
  }

  function cleanForm (isEditMode:boolean) {
    setFormValues(initialStateBlank);
    isEditMode && toggleEditMode();
  }

  function addExpositor (idSelected:string) {
    if (subeventoFormValues.speakers.includes(idSelected)) {
      const newExpositores = subeventoFormValues.speakers.filter((id) => id !== idSelected );
      setFormValues({ ...subeventoFormValues, speakers:newExpositores });
    }
    else setFormValues({ ...subeventoFormValues, speakers:[...subeventoFormValues.speakers, idSelected ]});
  }

  function setEvent (idEvento:string) {
    setFormValues({ ...formValues, eventId:idEvento });
  }

  return (
    <>
      <Grid item xs={12} lg={6} sx={allWidth}>
        <PaperFormContainer 
          primaryButtonText={isEditMode ? 'Editar' : 'Registrar'} 
          title={isEditMode ? 'Editar subevento' : 'Registrar subevento'} 
          onSubmit={onSubmit}
          cleanForm={() => cleanForm(true)}
          isLoading={isEditingSubevento || isRegisteringSubevento}
        >
          <TextField
            label='Título de subevento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.name}
            onChange={handleFormValues}
            name='name'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <TextField
            label='Descripción del subevento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.description}
            onChange={handleFormValues}
            name='description'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <TextField
            value={subeventoFormValues.initDate}
            onChange={handleFormValues}
            label="Fecha de realización"
            type="date"
            name='initDate'
            InputLabelProps={{ shrink: true }}
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ display:'flex', flexDirection:'column' }}>
              <TextField
                label="Hora de inicio"
                type="time"
                value={subeventoFormValues.initHour}
                InputLabelProps={{ shrink: true,}}
                inputProps={{ step: 300 }}
                onChange={handleFormValues}
                name='initHour'
                disabled={isEditingSubevento || isRegisteringSubevento}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display:'flex', flexDirection:'column' }}>   
              <TextField
                label="Fecha de de finalización"
                type="time"
                value={subeventoFormValues.endHour}
                InputLabelProps={{ shrink: true,}}
                inputProps={{ step: 300 }}
                onChange={handleFormValues}
                name='endHour'
                disabled={isEditingSubevento || isRegisteringSubevento}
              />           
            </Grid>
          </Grid>
          <CustomSelect
            options={subeventTypes}
            label='Tipo de evento'
            inputName='type'
            value={subeventoFormValues.type}
            handleSelect={handleSelect}
          />
          <TextField
            label='Link de formulario de evento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.formEvent}
            onChange={handleFormValues}
            name='formEvent'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <TextField
            label='Link de formulario de subevento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.formSubevent}
            onChange={handleFormValues}
            name='formSubevent'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <CustomImageSelector 
            label='Flyer de subevento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={subeventoFormValues.flyer}
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <ExpositoresSelector 
            addExpositor={addExpositor} 
            speakers={subeventoFormValues.speakers}
          />
          <EventoSelector 
            setEvent={setEvent} 
            eventId={subeventoFormValues.eventId}
          />
        </PaperFormContainer>
      </Grid>
      <SubeventosList 
        setFormValues={setFormValues}
        isLoadingAction={isEditingSubevento || isRegisteringSubevento}
      />
    </>
  )
}

function EventoSelector ({ setEvent, eventId }:any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>Evento al que pertenece</Typography>
        <Button variant='contained' onClick={() => setIsOpen(true)}>Seleccionar</Button>
      </Stack>
      <EventoDialog 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        setEvent={setEvent}
        eventId={eventId}
      />
    </>
  )
}

function EventoDialog ({ isOpen, setIsOpen, setEvent, eventId }:any) {
  const { register } = useSelectors();
  const { eventos } = register;
  return (
    <Dialog
      fullWidth={true}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DialogTitle>Evento al que pertenece (selecciona uno)</DialogTitle>
        <DialogContent>
          <List>
            {eventos.map(({ id, title }, key) => (
              <ListItem secondaryAction={<Checkbox edge="end" checked={eventId === id} onChange={() => setEvent(id)}/>} disablePadding key={key}>
                <ListItemButton onClick={() => setEvent(id)}>
                  <ListItemText primary={title}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
    </Dialog>
  )
}


function ExpositoresSelector ({ addExpositor, speakers }:any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>Expositores</Typography>
        <Button variant='contained' onClick={() => setIsOpen(true)}>Seleccionar</Button>
      </Stack>
      <ExpositoresDialog 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        addExpositor={addExpositor} 
        speakers={speakers}
      />
    </>
  )
}

function ExpositoresDialog ({ isOpen, setIsOpen, addExpositor, speakers }:any) {
  const { register } = useSelectors();
  const { expositores } = register;
  return (
    <Dialog
      fullWidth={true}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DialogTitle>Expositores que participarán en el subevento (selecciona uno o muchos)</DialogTitle>
        <DialogContent>
          <List>
            {expositores.map(({ firstName, lastName, profilePhoto, id }, key) => (
              <ListItem secondaryAction={<Checkbox edge="end" checked={speakers.includes(id)} onChange={() => addExpositor(id)}/>} disablePadding key={key}>
                <ListItemButton onClick={() => addExpositor(id)}>
                  <ListItemAvatar>
                    <Avatar src={profilePhoto}/>
                  </ListItemAvatar>
                  <ListItemText primary={`${firstName} ${lastName}`}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
    </Dialog>
  )
}

function SubeventosList ({ setFormValues, isLoadingAction }:any) {

  const { register, ui } = useSelectors();
  const { subeventos } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;
  
  function editEvento (evento:SubEventBodyFromDBWithId) {
    const { description, endDate, event, flyer, formEvent, formSubevent, initDate, name, speakers, type, id } = evento;
    const formValue:SubeventoBodyWithId = {
      description,
      endDate:'',
      endHour:endDate.slice(11, 16),
      eventId:event,
      flyer,
      formEvent,
      formSubevent,
      id,
      initDate:initDate.slice(0, 10),
      initHour:initDate.slice(11, 16),
      name,
      speakers,
      type
    }
    setFormValues(formValue);
    !isEditMode && toggleEditMode();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  const { removeSubeventoMutation } = useSubeventosQueries();
  const { mutate:removeSubevento, isLoading:isRemovingSubevento } = removeSubeventoMutation();

  return (
    <Grid item xs={12} lg={6} sx={{ display:'flex', flexDirection:'column' }}>
      <PaperContainer title='Subeventos guardados'>
        <Grid container spacing={2}>
          {subeventos.map((subevento, index) => {
            const { description, flyer, initDate, endDate, name, id } = subevento;
            return (
              <Grid item xs={12} md={6} lg={12} xl={6} key={index}>
                <Card>
                  <CardHeader
                    avatar={<Avatar>{name[0]}</Avatar>}
                    title={name}
                  />
                  <CardMedia
                    component="img"
                    height="120"
                    image={flyer}
                  />
                  <CardContent sx={{ backgroundColor:grey[100] }}>
                    <Typography 
                      variant='subtitle1'
                      color="text.secondary" 
                      sx={{ fontSize: 14 }} 
                    >Tipo de evento:</Typography>
                    <Typography 
                      variant='subtitle1'
                      color="text.secondary" 
                      sx={{ fontSize: 14 }} 
                      mb={2}
                    >Descripción: {description}</Typography>

                    <Stack alignItems='start' rowGap={1} mb={2}>
                      <Chip icon={<CalendarTodayIcon fontSize='small'/>} sx={{ padding:1 }} label={`Fecha de inicio: ${initDate}`}/>
                      <Chip icon={<CalendarTodayIcon fontSize='small'/>} sx={{ padding:1 }} label={`Fecha de cierre: ${endDate}`}/>
                    </Stack>
                    <Typography 
                      variant='subtitle1'
                      color="text.secondary" 
                      sx={{ fontSize: 14 }} 
                    >Ponentes:</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ backgroundColor:grey[100] }}>
                    <IconButton onClick={() => editEvento(subevento)} disabled={isLoadingAction || isRemovingSubevento}> 
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton disabled={isLoadingAction || isRemovingSubevento} onClick={() => removeSubevento(id)}>
                      <DeleteIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {!subeventos.length && <Alert severity='warning'>No hay subeventos registrados</Alert>}
      </PaperContainer>
    </Grid>
  )
}

const subeventTypes = [
  { label:'Taller', value:'1' },
  { label:'Curso', value:'2' },
  { label:'Conferencia', value:'3' },
  { label:'Práctica', value:'4' },
]