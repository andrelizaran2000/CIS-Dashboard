// Modules
import { useEffect } from 'react';

// Hooks
import useUserQueries from '../queries/useUserQueries';

// Screen
import LoadingScreen from './LoadingScreen';

export default function PublicRoute ({ children }:any) {

  useEffect(() => {
    mutate();
  }, []);

  const { validateToken } = useUserQueries();
  const { mutate, isLoading, data } = validateToken();

  if (isLoading) return <LoadingScreen/>
  if (!isLoading && data === undefined) return children;
  else return <></>
}

/* Se removieron los <Navigate/> debido a que en cierto momento
en que isLoading es false la data es undefined y crea un bucle 
redirigiendo */