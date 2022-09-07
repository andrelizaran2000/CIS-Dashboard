// Modules
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { 
  Alert, 
  Avatar, 
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
import { ExpositorBodyWithId } from '../../../types/expositor';
import { SubeventoBodyWithId, SubeventoBodyToDb, SubEventBodyFromDBWithId } from '../../../types/subeventos';

// Icons
import CloseIcon from '@mui/icons-material/Close';
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
  eventId:'',
  platformLink:'',
  platforms: [],
  speakers:[],
  platformId:'1',
  type:'1',
  hasRegistration:true
}

export default function Subeventos() {

  const { 
    formValues, 
    handleFormValues, 
    handleImageSelector, 
    setFormValues, 
    handleSelect,
  } = useForm(initialStateBlank);
  
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
    const { name, description, initDate, initHour, endHour, flyer, speakers, platforms } = subeventoFormValues;
    if (name && description && initDate && flyer && initHour && endHour && speakers.length > 0 && platforms.length > 0) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  function onSubmit () {
    if (!validateForm()) return;

    const { 
      name, 
      description, 
      initDate, 
      initHour, 
      endHour, 
      flyer, 
      type, 
      eventId, 
      speakers, 
      id, 
      hasRegistration,
      platforms 
    } = subeventoFormValues;

    const subeventoBodyToDb:SubeventoBodyToDb = {
      type,
      name,
      description,
      initDate: `${initDate} ${initHour}`,
      endDate: `${initDate} ${endHour}`,
      flyer,
      platforms,
      speakers,
      eventId,
      hasRegistration
    }
    if (isEditMode) editSubevento({ ...subeventoBodyToDb, id }); 
    else registerSubevento(subeventoBodyToDb); 
  }

  function addPlatform () {
    const id = formValues.platformId;
    const link = formValues.platformLink;
    setFormValues({ 
      ...formValues, 
      platformId:'1',
      platformLink:'',
      platforms: [ ...formValues.platforms, { id, link }]
    });
  }

  function cleanForm (isEditMode:boolean) {
    setFormValues(initialStateBlank);
    isEditMode && toggleEditMode();
  }

  function deletePlatform (id:number) {
    const filteredPlatforms = subeventoFormValues.platforms.filter((_, key) => key !== id);
    setFormValues({ ...subeventoFormValues, platforms:filteredPlatforms })
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
            rows={4}
            multiline
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
            disabled={isEditingSubevento || isRegisteringSubevento}
          />

          <CustomImageSelector 
            label='Flyer de subevento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={subeventoFormValues.flyer}
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

          <AddPlatformSelector
            handleFormValues={handleFormValues}
            handleSelect={handleSelect}
            value={subeventoFormValues.type}
            addPlatform={addPlatform}
            platformList={subeventoFormValues.platforms}
            deletePlatform={deletePlatform}
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

function AddPlatformSelector ({ handleFormValues, handleSelect, value, addPlatform, platformList, deletePlatform }:any) {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);

  return (
    <>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Typography>Links de la plataforma</Typography>
        <Stack columnGap={2} flexDirection='row'>
          <Button variant='contained' onClick={() => setIsOpenList(true)}>Ver lista</Button>
          <Button variant='contained' onClick={() => setIsOpen(true)}>Agregar</Button>
        </Stack>
      </Stack>
      <PlatformLinksDialog
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        handleFormValues={handleFormValues}
        handleSelect={handleSelect}
        value={value}
        addPlatform={addPlatform}
      />
      <PlatformListDialog
        isOpenList={isOpenList}
        setIsOpenList={setIsOpenList}
        platformList={platformList}
        deletePlatform={deletePlatform}
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

function PlatformLinksDialog ({ isOpen, setIsOpen, handleFormValues, handleSelect, value, addPlatform }:any) {
  return (
    <Dialog
      fullWidth={true}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DialogTitle>Links de la plataforma</DialogTitle>
      <DialogContent>
        <Stack sx={{ rowGap:2, mt:1 }}>
          <CustomSelect
            options={platformOptions}
            label='Plataforma a la que pertence'
            inputName='type'
            handleSelect={handleSelect}
            value={value}
          />
          <TextField
            label='Link de plataforma'
            type='text'
            autoComplete='off'
            onChange={handleFormValues}
            name='platformLink'
            sx={{ width:'100%' }}
          />
          <Button 
            variant='contained'
            onClick={() => { addPlatform(); setIsOpen(false) }}
          >Agregar plataforma</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

function PlatformListDialog ({ isOpenList, setIsOpenList, platformList, deletePlatform }:any) {
  return (
    <Dialog
      fullWidth={true}
      open={isOpenList}
      onClose={() => setIsOpenList(false)}
    >
      <DialogTitle>Lista de la plataforma</DialogTitle>
      <DialogContent>
        <Stack>
          {platformList.map(({ link }:any, key:any) => (
            <Stack sx={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }} key={key}>
              <Typography>{link}</Typography>
              <IconButton onClick={() => deletePlatform(key)}>
                <CloseIcon/>
              </IconButton>
            </Stack>
          ))}
          {platformList.length === 0 && <Alert severity="info">No hay plataformas enlistadas</Alert>}
        </Stack>
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

    const { 
      description, 
      endDate, 
      event, 
      flyer, 
      platforms, 
      initDate, 
      name, 
      speakers, 
      type, 
      id,
      hasRegistration
    } = evento;

    const formValue:SubeventoBodyWithId = {
      description,
      endDate:'',
      endHour:endDate.slice(11, 16),
      eventId:event,
      flyer,
      platformId: platforms[0].id,
      platformLink: platforms[0].link,
      id,
      initDate:initDate.slice(0, 10),
      initHour:initDate.slice(11, 16),
      name,
      speakers,
      type,
      hasRegistration,
      platforms
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
            const { description, flyer, initDate, endDate, name, id, type, speakers, platforms } = subevento;
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

                    <Typography variant='subtitle1' color="text.secondary" sx={{ fontSize: 14 }}>
                      Tipo de evento:
                      {type === '1' ? ' Taller' : ''}
                      {type === '2' ? ' Curso' : ''}
                      {type === '3' ? ' Conferencia' : ''}
                      {type === '4' ? ' Práctica' : ''}
                    </Typography>

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

                    <PonentesList speakers={speakers}/>

                    <Stack sx={{ mb:2 }}>
                      <Typography
                        variant='subtitle1'
                        color="text.secondary"
                        sx={{ fontSize: 14 }}
                      >Link de plataforma:</Typography>
                      <Typography
                        variant='subtitle1'
                        color="text.secondary"
                        sx={{ fontSize: 14 }}
                      ><a href={platforms[0].link}>{platforms[0].link}</a></Typography>
                    </Stack>

                    <Stack>
                      <Typography
                        variant='subtitle1'
                        color="text.secondary"
                        sx={{ fontSize: 14 }}
                      >
                        Plataforma:
                        {platforms[0].id == '1' && ' Facebook'}
                        {platforms[0].id == '2' && ' Youtube'}
                      </Typography>
                    </Stack>

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

type PonentesListProps = {
  speakers:string[];
}

function PonentesList ({ speakers }:PonentesListProps) {

  const { register } = useSelectors();
  const [ speakersWithData, setSpeakersWithData ] = useState<ExpositorBodyWithId[]>([]);

  useEffect(() => {
    const newExpositores = register.expositores.filter(({ id }) => speakers.includes(String(id)));
    setSpeakersWithData(newExpositores)
  }, [speakers])

  return (
    <List>
      {speakersWithData.map(({ firstName, lastName, profilePhoto }, key) => (
        <ListItem key={key}>
          <ListItemAvatar>
            <Avatar src={profilePhoto}/>
          </ListItemAvatar>
          <ListItemText secondary={`${firstName} ${lastName}`}/>
        </ListItem>
      ))}
    </List>
  )
}

const subeventTypes = [
  { label:'Taller', value:'1' },
  { label:'Curso', value:'2' },
  { label:'Conferencia', value:'3' },
  { label:'Práctica', value:'4' },
];

const platformOptions = [
  { label:'Facebook', value:'1' },
  { label:'Youtube', value:'2' },
]

