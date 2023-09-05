// Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigationStyles from './Navigation.module/navigationStyles'; 

function Navigation() {
  const { pathname } = useLocation(); 

  return (
    <nav style={navigationStyles.nav}>
      <ul style={navigationStyles.ul}>
        <li style={{ ...navigationStyles.li, ...(pathname === '/login' && navigationStyles.activeLink) }}>
          <Link to="/login" style={navigationStyles.link}>Login</Link>
        </li>
        <li style={{ ...navigationStyles.li, ...(pathname === '/register' && navigationStyles.activeLink) }}>
          <Link to="/register" style={navigationStyles.link}>Register</Link>
        </li>
        {/* Додайте інші посилання на сторінки, які вам потрібні */}
      </ul>
    </nav>
  );
}

export default Navigation;
