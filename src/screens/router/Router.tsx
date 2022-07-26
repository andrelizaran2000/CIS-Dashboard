// Modules
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Screens
import Home from '../screens/Home';
import Login from '../screens/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route 
          path="/"     
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          }
        />
        <Route 
          path="*"     
          element={<main>There is no page</main>}
        />
      </Routes>
    </BrowserRouter>
  )
}