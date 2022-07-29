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
  const { mutate, isLoading } = validateToken();

  if (isLoading) return <LoadingScreen/>
  else return children;
}
