import React from 'react';
import { useSelector} from 'react-redux';
import ContactForm from '../../ContactForm/ContactForm';
import ContactList from '../../ContactList/ContactList';
import styles from './UserMenu.module/UserMenu.module.css';
import Filter from 'components/Filter/Filter';



function UserMenu() {
  const user = useSelector(state => state.auth.user);



  return (
    <div className={styles.container}>
      {user ? (
        <div>
          <ContactForm />
          <Filter/>
          <ContactList />
        </div>
      ) : (
        <p className={styles.userNotLoggedIn}>User not logged in</p>
      )}
    </div>
  );
}

export default UserMenu;
