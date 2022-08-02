// Modules
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { 
  Alert, 
  Avatar, 
  Box, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  Grid, 
  IconButton, 
  List, 
  ListItem, 
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
import { SubeventoBody, SubeventoBodyWithId } from '../../../types/subeventos';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const initialStateBlank:SubeventoBody = {
  name:'Aprende JS desde cero',
  description:'Generic description',
  initHour:'07:30',
  initDate:'2022-01-01',
  endHour:'09:30',
  endDate:'2022-01-01',
  flyer:'https://www.adictosaltrabajo.com/wp-content/uploads/2018/05/el_remozado_javascript.imagen.jpg',
  type:'1',
  eventId:'1',
  expositorId:'1',
  formEvent:'',
  formSubevent:'',
  expositoresIds:[],
  speakers:[]
}

export default function Subeventos() {

  const { 
    formValues, 
    handleFormValues, 
    handleImageSelector, 
    setFormValues, 
    handleSelect,
    handleSelectArray 
  } = useForm(initialStateBlank);
  
  const subeventoFormValues = formValues as SubeventoBodyWithId;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const { ui, register } = useSelectors();
  const { isEditMode } = ui;

  // Queries
  const { editSubeventoMutation, registerSubeventoMutation, getSubeventosQuery } = useSubeventosQueries();
  const { mutate:editSubevento, isLoading:isEditingSubevento } = editSubeventoMutation(cleanForm);
  const { mutate:registerSubevento, isLoading:isRegisteringSubevento } = registerSubeventoMutation(cleanForm);

  // Eventos options
  const [eventos, setEventos] = useState<{ value: string; label: string;}[]>([]);
  const [expositores, setExpositores] = useState<{ value: string; label: string;}[]>([]);

  useEffect(() => {
    const options = register.eventos.map(({ id, title }) => ({ value:id, label:title }));
    setEventos(options);
  }, [register.eventos]);

  useEffect(() => {
    const options = register.expositores.map(({ id, firstName, lastName }) => ({ value:id, label:`${firstName} ${lastName}`}));
    setExpositores(options);
  }, [register.expositores]);

  function validateForm () {
    const { name, description, initDate, initHour, endHour, flyer, formEvent, formSubevent } = subeventoFormValues;
    if (name && description && initDate && flyer && initHour && endHour && formEvent && formSubevent) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  function onSubmit () {
    if (!validateForm()) return;
    if (isEditMode) editSubevento(subeventoFormValues); 
    else {
      const { id, ...restSubevento } = subeventoFormValues;
      registerSubevento(restSubevento); 
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
              />           
            </Grid>
          </Grid>
          <CustomSelect
            options={expositores}
            label='Expositores participantes'
            inputName='expositorId'
            inputNameValues='expositoresIds'
            value={subeventoFormValues.expositorId}
            values={subeventoFormValues.expositoresIds}
            handleSelectArray={handleSelectArray}
          />
          {(subeventoFormValues.expositoresIds.length > 0) && <ExpositoresList expositoresList={subeventoFormValues.expositoresIds}/>} 
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomSelect
                options={eventos}
                label='Evento al que pertenece'
                inputName='eventId'
                value={subeventoFormValues.eventId}
                handleSelect={handleSelect}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                options={subeventTypes}
                label='Tipo de evento'
                inputName='type'
                value={subeventoFormValues.type}
                handleSelect={handleSelect}
              />
            </Grid>
          </Grid>
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
        </PaperFormContainer>
      </Grid>
      <SubeventosList 
        setFormValues={setFormValues}
        isLoadingAction={isEditingSubevento || isRegisteringSubevento}
      />
    </>
  )
}

function ExpositoresList ({ expositoresList }:any) {
  return (
    <Stack>
      <Typography variant='subtitle1' pl={1}>Expositores escogidos</Typography>
      <List>
        {expositoresList.map(({ label }:any, key:any) => (
          <ListItem 
            key={key}
            secondaryAction={<IconButton edge="end"><DeleteIcon /></IconButton>}
          >
            <ListItemText
              secondary={label}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

function SubeventosList ({ setFormValues, isLoadingAction }:any) {

  const { register, ui } = useSelectors();
  const { subeventos } = register;
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode } = uiBindedActions;
  
  function editEvento (evento:SubeventoBodyWithId) {
    setFormValues(evento);
    !isEditMode && toggleEditMode();
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  return (
    <Grid item xs={12} lg={6} sx={{ display:'flex', flexDirection:'column' }}>
      <PaperContainer title='Subeventos guardados'>
        <Grid container spacing={2}>
          {subeventos.map((subevento, index) => {
            const { description, flyer, initDate, name } = subevento;
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
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ backgroundColor:grey[100] }}>
                    <IconButton onClick={() => { editEvento(subevento)}} disabled={isLoadingAction}> 
                      <ModeEditIcon/>
                    </IconButton>
                    <IconButton disabled={isLoadingAction}>
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