// Modules
import { useEffect, useState } from 'react';
import { blueGrey, green, orange, red } from '@mui/material/colors';

// Components
import Eventos from '../components/screens/home/Eventos';
import Subeventos from '../components/screens/home/Subeventos';
import Expositores from '../components/screens/home/Expositores';
import ColorContainer from '../components/containers/ColorContainer';

// Hooks
import useSelectors from '../hooks/useSelectors';
import ExpositoresSubeventos from '../components/screens/home/ExpositoresSubeventos';

export default function Home() {

  const { ui } = useSelectors();
  const { homeSection } = ui;
  const [ bgColor, setBgColor ] = useState<string>(blueGrey[400]);
  
  useEffect(() => {
    switch (homeSection) {
      case 'eventos':
        setBgColor(green[200]);
        break;
      case 'subeventos':
        setBgColor(orange[200]);
        break;
      case 'expositores':
        setBgColor(blueGrey[300]);
        break;
      case 'expositores-subeventos':
        setBgColor(red[300]);
        break;
    }
  }, [homeSection])
  
  return (
    <ColorContainer bgColor={bgColor}>
      {homeSection === 'expositores' && <Expositores/>}
      {homeSection === 'eventos' && <Eventos/>}
      {homeSection === 'subeventos' && <Subeventos/>}
      {homeSection === 'expositores-subeventos' && <ExpositoresSubeventos/>}
    </ColorContainer>
  )
}

