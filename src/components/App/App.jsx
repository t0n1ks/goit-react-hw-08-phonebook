import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navigation from '../Pages/Navigation/Navigation';
import Container from '../Container/Container'; 

const LoginPage = React.lazy(() => import('../PagesLog/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('../PagesLog/RegistrationPage/RegistrationPage'));
const UserMenu = React.lazy(() => import('../Pages/UserMenu/UserMenu'));


function App() {
  return (
    <Router basename="/goit-react-hw-08-phonebook">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<><Container><Navigation/><Outlet/></Container></>}>
        <Route index element={<LoginPage />} />
          <Route path="/login" element={<Container> <LoginPage /><ToastContainer /></Container>} />
          <Route path="/register" element={ <Container><RegistrationPage /><ToastContainer /></Container>}/>
          <Route path="/user-menu" element={ <Container><UserMenu /><ToastContainer /></Container>}/>
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;