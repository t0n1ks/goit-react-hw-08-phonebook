// Navigation.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/authSlice';
import { resetContacts } from 'redux/contactsSlice/contactsSlice';
import styles from './Navigation.module/Navigation.module.css';

function Navigation() {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleLogout = async () => {
    try {
      dispatch(logout({ token: token }));
      dispatch(resetContacts());

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {isAuthenticated ? (
          <>
            <li className={styles.li}>
              <p className={styles.userInfo}>{user.email}</p>
            </li>
            <li className={styles.li}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.li}>
              <Link
                to="/login"
                className={`${styles.link} ${pathname === '/login' && styles.activeLink}`}
              >
                Login
              </Link>
            </li>
            <li className={styles.li}>
              <Link
                to="/register"
                className={`${styles.link} ${pathname === '/register' && styles.activeLink}`}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
