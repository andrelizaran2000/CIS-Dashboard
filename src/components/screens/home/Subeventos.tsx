// Modules
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
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
  Typography 
} from '@mui/material';

// Components
import CustomSelect from '../../forms/CustomSelect';
import CustomSwitch from '../../forms/CustomSwitch';
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
  name:'',
  description:'',
  initHour:'',
  initDate:'',
  endHour:'',
  flyer:'',
  register:true,
  type:0,
  limit:0,
  status:0,
  eventId:0,
  eventLink:'',
  formLink:''
}

export default function Subeventos() {

  const { 
    formValues, 
    handleFormValues, 
    handleImageSelector, 
    setFormValues, 
    handleSwitch, 
    handleSelect 
  } = useForm(initialStateBlank);
  
  const subeventoFormValues = formValues as SubeventoBodyWithId;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const { ui, register } = useSelectors();
  const { isEditMode } = ui;

  // Queries
  const { editSubeventoMutation, getSubeventosQuery, registerSubeventoMutation } = useSubeventosQueries();
  
  const { mutate:editSubevento, isLoading:isEditingSubevento } = editSubeventoMutation(cleanForm);
  const { mutate:registerSubevento, isLoading:isRegisteringSubevento } = registerSubeventoMutation(cleanForm);

  // Eventos options
  const [eventos, setEventos] = useState<{ value: number; label: string;}[]>([]);

  useEffect(() => {
    const options = register.eventos.map(({ id, title }) => ({ value:Number(id), label:title }));
    setEventos(options);
  }, []);

  function validateForm () {
    const { name, description, initDate, initHour, endHour, flyer, eventLink, formLink } = subeventoFormValues;
    if (name && description && initDate && flyer && initHour && endHour && eventLink && formLink) return true;
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
            label='Limite'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.limit}
            onChange={handleFormValues}
            name='limit'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <CustomSelect
            options={eventos}
            label='Evento al que pertenece'
            inputName='eventId'
            value={subeventoFormValues.eventId}
            handleSelect={handleSelect}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomSelect
                options={subeventTypes}
                label='Tipo de evento'
                inputName='type'
                value={subeventoFormValues.type}
                handleSelect={handleSelect}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomSelect
                options={subeventStatus}
                label='Estatus del evento'
                inputName='status'
                value={subeventoFormValues.status}
                handleSelect={handleSelect}
              />
            </Grid>
          </Grid>
          <TextField
            value={subeventoFormValues.initDate}
            onChange={handleFormValues}
            label="Fecha de realización"
            type="date"
            defaultValue="2017-05-24"
            name='initDate'
            InputLabelProps={{ shrink: true }}
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack flexDirection='column'>
                <TextField
                  label="Hora de inicio"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{ shrink: true,}}
                  inputProps={{ step: 300 }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display:'flex', flexDirection:'column' }}>   
              <TextField
                label="Fecha de de finalización"
                type="time"
                defaultValue="09:30"
                InputLabelProps={{ shrink: true,}}
                inputProps={{ step: 300 }}
              />           
            </Grid>
          </Grid>
          <TextField
            label='Link de formulario'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.formLink}
            onChange={handleFormValues}
            name='formLink'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <TextField
            label='Link de evento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.eventLink}
            onChange={handleFormValues}
            name='eventLink'
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <CustomImageSelector 
            label='Flyer de subevento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={subeventoFormValues.flyer}
            disabled={isEditingSubevento || isRegisteringSubevento}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='register'
            label='Registro disponible'
            value={subeventoFormValues.register}
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
  { label:'Taller', value:1 },
  { label:'Curso', value:2 },
  { label:'Conferencia', value:3 },
  { label:'Práctica', value:4 },
]

const subeventStatus = [
  { label:'En curso', value:1 },
  { label:'Pospuesto', value:2 },
  { label:'Cancelado', value:3 },
]