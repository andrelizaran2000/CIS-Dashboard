// Modules
import { useEffect } from 'react';

// Hooks
import useUserQueries from '../queries/useUserQueries';

// Screen
import LoadingScreen from './LoadingScreen';

export default function PrivateRoute ({ children }:any) {

  useEffect(() => {
    mutate();
  }, []);

  const { validateToken } = useUserQueries();
  const { mutate, isLoading, data } = validateToken();

  if (isLoading) return <LoadingScreen/>
  if (!isLoading && data !== undefined) return children;
  else return <></>
}
