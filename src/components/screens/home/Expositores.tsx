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
  TextField, 
  Typography 
} from '@mui/material';

// Hooks
import useForm from '../../../hooks/useForm';

// Types
import { ExpositorBodyWithId } from '../../../types/expositor';

// Components
import CustomSwitch from '../../../components/forms/CustomSwitch';
import CustomImageSelector from '../../forms/CustomImageSelector';
import PaperContainer from '../../../components/containers/PaperContainer';
import PaperFormContainer from '../../../components/forms/PaperFormContainer';

// Api
import { editExpositor, registerExpositor } from '../../../api/expositores';

// Styles
import { allWidth } from '../../../components/containers/ColorContainer';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Hooks
import useSelectors from '../../../hooks/useSelectors';
import useBindActions from '../../../hooks/useBindActions';

const initialStateBlank:ExpositorBodyWithId = {
  id:0,
  fullName:'',
  description:'',
  title:'',
  visible:true,
  profilePhoto:'',
  coverPhoto:'',
}

export default function Expositores () {

  const { formValues, handleSwitch, handleFormValues, handleImageSelector, setFormValues } = useForm(initialStateBlank);
  const expositorFormValues = formValues as ExpositorBodyWithId;
  const { ui } = useSelectors();
  const { isEditMode } = ui;
  const { uiBindedActions } = useBindActions();
  const { toggleEditMode, showSnackMessage } = uiBindedActions;

  function validateForm () {
    const { coverPhoto, description, fullName, profilePhoto, title } = expositorFormValues;
    if (coverPhoto && description && fullName && profilePhoto && title) return true;
    showSnackMessage('No has completado toda la información del formulario');
    return false;
  }

  async function onSubmitRegister () {
    try {
      if (!validateForm()) return;
      const { id, ...expositorRest } = expositorFormValues;
      await registerExpositor(expositorRest);
    } catch (error:any) {
      console.log(error.response);
    }
  }

  async function onSubmitEdit () {
    try {
      if (!validateForm()) return;
      await editExpositor(expositorFormValues);
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
          title={isEditMode ? 'Editar expositor' : 'Registrar expositor'} 
          onSubmit={() => isEditMode ? onSubmitEdit() : onSubmitRegister()}
          cleanForm={cleanForm}
        >
          <TextField
            label='Nombre de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.fullName}
            onChange={handleFormValues}
            name='fullName'
          />
          <TextField
            label='Descripción de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.description}
            onChange={handleFormValues}
            name='description'
          />
          <TextField
            label='Título de expositor'
            type='text'
            autoComplete='off'
            value={expositorFormValues.title}
            onChange={handleFormValues}
            name='title'
          />
          <CustomImageSelector 
            label='Foto de perfil' 
            inputName='profilePhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.profilePhoto}
          /> 
          <CustomImageSelector 
            label='Foto de portada' 
            inputName='coverPhoto' 
            handleImageSelector={handleImageSelector}
            value={expositorFormValues.coverPhoto}
          />
          <CustomSwitch
            handleSwitch={handleSwitch}
            inputName='visible'
            label='Expositor visible'
            value={expositorFormValues.visible}
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
            const { title, fullName, description, coverPhoto, profilePhoto } = expositor;
            return (
              <Grid item xs={12} md={6} lg={12} xl={6} key={index}>
                <Card>
                  <CardHeader
                    avatar={<Avatar src={profilePhoto}/>}
                    title={fullName}
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