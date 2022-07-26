// Modules
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Api
import { validateTokenApi } from '../api/user';

// Hooks
import useBindActions from '../hooks/useBindActions';

// Screen
import LoadingScreen from './LoadingScreen';

export default function PublicRoute ({ children }:any) {

  useEffect(() => {
    validateToken();
  }, []);

  const [ loadingState, setLoadingState ] = useState({ isLoading:true, isAuthorized:true });
  const { userBindedActions } = useBindActions();
  const { loginUser } = userBindedActions;

  async function validateToken () {
    try {
      const token = localStorage.getItem('cis-token');
      setLoadingState({ isLoading:true, isAuthorized:false });
      const { data } = await validateTokenApi(`Bearer ${token}`);
      loginUser(data);
      setLoadingState({ isLoading:false, isAuthorized:true });
    } catch (error:any) {
      setLoadingState({ isLoading:false, isAuthorized:false });
    }
  }

  if (loadingState.isLoading) return <LoadingScreen/>
  else if (!loadingState.isLoading && loadingState.isAuthorized) return <Navigate to='/'/>
  else return children;
}