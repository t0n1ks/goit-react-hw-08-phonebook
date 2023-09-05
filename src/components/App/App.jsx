import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../Pages/Navigation/Navigation.module';
import Container from '../Container/Container';

const LoginPage = React.lazy(() => import('../PagesLog/LoginPage/LoginPage'));
const RegistrationPage = React.lazy(() => import('../PagesLog/RegistrationPage/RegistrationPage'));
const UserMenu = React.lazy(() => import('../Pages/UserMenu/UserMenu'));

function App() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Container> <LoginPage /></Container>} />
          <Route path="/register" element={ <Container><RegistrationPage /></Container>}/>
          <Route path="/user-menu" element={ <Container><UserMenu /></Container>}/>
          {/* Додайте інші роути тут */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
