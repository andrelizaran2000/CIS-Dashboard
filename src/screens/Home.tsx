// Modules
import { useEffect, useState } from 'react';
import { blueGrey, green, orange } from '@mui/material/colors';

// Components
import Eventos from '../components/screens/home/Eventos';
import Subeventos from '../components/screens/home/Subeventos';
import Expositores from '../components/screens/home/Expositores';
import ColorContainer from '../components/containers/ColorContainer';

// Hooks
import useSelectors from '../hooks/useSelectors';
import useSubeventosQueries from '../queries/useSubeventosQueries';
import useEventosQueries from '../queries/useEventosQueries';
import useExpositoresQueries from '../queries/useExpositoresQueries';

export default function Home() {

  const { ui } = useSelectors();
  const { homeSection } = ui;
  const [ bgColor, setBgColor ] = useState<string>(blueGrey[400]);

  const { getSubeventosQuery } = useSubeventosQueries();
  const { getEventosQuery } = useEventosQueries();
  const { getExpositoresQuery } = useExpositoresQueries();

  const { refetch:getExpositores } = getExpositoresQuery();
  const { refetch:getEventos } = getEventosQuery();
  const { refetch:getSubeventos } = getSubeventosQuery();

  useEffect(() => {
    getExpositores();
    getEventos();
    getSubeventos();
  }, [])
  
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
    }
  }, [homeSection])
  
  return (
    <ColorContainer bgColor={bgColor}>
      {homeSection === 'expositores' && <Expositores/>}
      {homeSection === 'eventos' && <Eventos/>}
      {homeSection === 'subeventos' && <Subeventos/>}
    </ColorContainer>
  )
}

