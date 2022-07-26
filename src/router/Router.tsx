// Modules
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Screens
import Home from '../screens/Home';
import Login from '../screens/Login';

// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

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