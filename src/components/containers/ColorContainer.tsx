// Modules
import { ReactNode, useState } from 'react';
import { grey } from '@mui/material/colors';
import { 
  AppBar, 
  Box, 
  Button, 
  Divider, 
  Drawer, 
  Grid, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Stack, 
  Toolbar, 
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Hooks
import useSelectors from '../../hooks/useSelectors';
import useBindActions from '../../hooks/useBindActions';

// Types
import { PossibleHomeSections } from '../../store/types/ui';

type Props = {
  bgColor:string;
  children:ReactNode;
  window?: () => Window;
}

const drawerWidth = 240;

const menuOptions = [
  'Expositores',
  'Eventos', 
  'Subeventos',
]

export default function ColorContainer ({ bgColor, children, window }:Props) {

  const container = window !== undefined ? () => window().document.body : undefined;
  const [ mobileOpen, setMobileOpen ] = useState(false);
  const { userBindedActions, uiBindedActions } = useBindActions();
  const { logoutUser } = userBindedActions;
  const { toggleHomeSection, toggleEditMode } = uiBindedActions;
  const { ui } = useSelectors();
  const { isEditMode } = ui;
  const navigation = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleLogOut () {
    logoutUser();
    navigation('/');
    if (isEditMode) toggleEditMode();
  }

  function handleToggleSection (index:number) {
    var section = '';
    switch (index) {
      case 0:
        section = 'expositores';
        break;
      case 1:
        section = 'eventos';
        break;
      case 2:
        section = 'subeventos';
        break;
    }
    isEditMode && toggleEditMode();
    toggleHomeSection(section as PossibleHomeSections)
  }

  const drawer = (
    <div>
      <Toolbar/>
      <Divider />
      <List>
        {menuOptions.map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => handleToggleSection(index)}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <PeopleIcon/> }
                {index === 1 && <EventIcon/> }
                {index === 2 && <CalendarMonthIcon/> }
                {index === 3 && <PeopleIcon/> }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display:'flex', backgroundColor:bgColor, minHeight:'100vh' }}>

      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar sx={toolbarStyle}>
          <Stack direction='row' alignItems='center'>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">CIS</Typography>
          </Stack>
          <Button variant='contained' color='error' onClick={handleLogOut}>
            <LogoutIcon fontSize='small'/>
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={phoneDrawerStyle}
        >{drawer}</Drawer>
        <Drawer 
          variant="permanent" 
          open
          sx={pcDrawerStyle}
        >{drawer}</Drawer>
      </Box>

      <Box component="main" sx={mainContainerStyle}>
        <Toolbar />
        <Grid container sx={{ padding:commonPaddingStyle }} spacing={commonPaddingStyle}>
          {children}
        </Grid>
      </Box>

    </Box>
  )
}

export const commonPaddingStyle = { xs:3, md:4 }

// Styles
export const allWidth = {
  display:'flex', 
  flexDirection:'column' 
}

export const toolbarStyle = {
  display:'flex', 
  justifyContent:'space-between', 
  alignItems:'center', 
  paddingX:commonPaddingStyle
}

const phoneDrawerStyle = {
  display: { xs: 'block', sm: 'none' },
  '& .MuiDrawer-paper': { 
    boxSizing: 'border-box',
    width: drawerWidth 
  }
}

const pcDrawerStyle = {
  display: {
    xs: 'none', 
    sm: 'block' 
  }, 
  '& .MuiDrawer-paper': { 
    boxSizing: 'border-box',
    width: drawerWidth 
  }
}

const mainContainerStyle = {
  flexGrow: 1, 
  width: { sm: `calc(100% - ${drawerWidth}px)` }
}

const appBarStyles = {
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
  backgroundColor: grey[900]
}