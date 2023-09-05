import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/authSlice';
import axios from 'axios';
import ContactForm from '../../ContactForm/ContactForm';
import ContactList from '../../ContactList/ContactList';
import styles from './UserMenu.module/UserMenu.module.css';

function UserMenu() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('https://connections-api.herokuapp.com/users/logout');
      dispatch(logout());
      localStorage.removeItem('token'); // Видаліть токен з локального сховища при виході
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      {user ? (
        <div>
          <p className={styles.userInfo}>{user.email}</p>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
          <ContactForm />
          <ContactList />
        </div>
      ) : (
        <p className={styles.userNotLoggedIn}>User not logged in</p>
      )}
    </div>
  );
}

export default UserMenu;
