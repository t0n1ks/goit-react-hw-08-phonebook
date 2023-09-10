import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../../ContactForm/ContactForm';
import ContactList from '../../ContactList/ContactList';
import styles from './UserMenu.module/UserMenu.module.css';
import Filter from 'components/Filter/Filter';

function UserMenu() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    debugger
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      {/* {isAuthenticated ? ( */}
        <div>
          <ContactForm />
          <Filter />
          <ContactList />
        </div>
      {/* ) : (
        <p className={styles.userNotLoggedIn}>User not logged in</p>
      )} */}
    </div>
  );
}

export default UserMenu;
