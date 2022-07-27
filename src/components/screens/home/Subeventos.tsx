// Modules
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
  Typography 
} from '@mui/material';

// Components
import PaperContainer from '../../containers/PaperContainer';
import PaperFormContainer from '../../forms/PaperFormContainer';
import CustomImageSelector from '../../forms/CustomImageSelector';

// Hooks
import useForm from '../../../hooks/useForm';
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';

// Styles
import { allWidth } from '../../containers/ColorContainer'

// Types
import { SubeventoBody, SubeventoBodyWithId } from '../../../types/subeventos';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { editSubeventoApi, registerSubeventoApi } from '../../../api/subevento';

const initialStateBlank:SubeventoBody = {
  title:'',
  description:'',
  initDate:'',
  endDate:'',
  flyer:'',
}

export default function Subeventos() {

  const { formValues, handleFormValues, handleImageSelector, setFormValues } = useForm(initialStateBlank);
  const subeventoFormValues = formValues as SubeventoBodyWithId;
  const { uiBindedActions, registerBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;
  const { ui, register } = useSelectors();
  const { subeventos } = register;
  const { isEditMode } = ui;
  const { setSubeventos } = registerBindedActions;

  function validateForm () {
    const { title, description, initDate, endDate, flyer } = subeventoFormValues;
    if (title && description && initDate && endDate && flyer) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  async function onSubmitRegister () {
    if (!validateForm()) return;
    const { id, ...subeventRest } = subeventoFormValues;
    await registerSubeventoApi(subeventRest);
    const newSubeventos = [ subeventoFormValues, ...subeventos ];
    setSubeventos(newSubeventos);
    showSnackMessage('Nuevo evento registrado');
    setFormValues(initialStateBlank);
  }

  async function onSubmitEdit () {
    try {
      if (!validateForm()) return;
      await editSubeventoApi(subeventoFormValues);
      const newEventos = subeventos.map(({ id, ...restSubevent }) => {
        if (id === subeventoFormValues.id) return subeventoFormValues;
        return { id, ...restSubevent };
      });
      setSubeventos(newEventos);
      showSnackMessage('Subevento editado');
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
          primaryButtonText={isEditMode ? 'Editar' : 'Registrar'} 
          title={isEditMode ? 'Editar subevento' : 'Registrar subevento'} 
          onSubmit={() => isEditMode ? onSubmitEdit() : onSubmitRegister()}
          cleanForm={cleanForm}
        >
          <TextField
            label='Título de subevento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.title}
            onChange={handleFormValues}
            name='title'
          />
          <TextField
            label='Descripción del subevento'
            type='text'
            autoComplete='off'
            value={subeventoFormValues.description}
            onChange={handleFormValues}
            name='description'
          />
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de inicio</Typography>
            <TextField
              type='date'
              value={subeventoFormValues.initDate}
              onChange={handleFormValues}
              name='initDate'
            />
          </Stack>
          <Stack flexDirection='column'>
            <Typography variant='subtitle2' mb={1}>Fecha de cierre</Typography>
            <TextField
              type='date'
              value={subeventoFormValues.initDate}
              onChange={handleFormValues}
              name='endDate'
            />
          </Stack>
          <CustomImageSelector 
            label='Flyer de subevento' 
            inputName='flyer' 
            handleImageSelector={handleImageSelector}
            value={subeventoFormValues.flyer}
          />
        </PaperFormContainer>
      </Grid>
      <SubeventosList setFormValues={setFormValues}/>
    </>
  )
}

function SubeventosList ({ setFormValues }:any) {

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
            const { description, endDate, flyer, initDate, title } = subevento;
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
                    <IconButton onClick={() => { editEvento(subevento)}}> 
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
        {!subeventos.length && <Alert severity='warning'>No hay subeventos registrados</Alert>}
      </PaperContainer>
    </Grid>
  )
}