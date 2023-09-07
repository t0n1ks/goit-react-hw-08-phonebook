import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, updateContacts } from '../../redux/contactsSlice/contactsSlice';
import s from './ContactList.module/ContactList.module.css';
import { deleteContact as deleteContactApi, sendGetContactsRequest } from '../../api/api';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.token); // Отримайте токен користувача зі стейту

  useEffect(() => {
    const getContacts = async () => {
      // Отримайте список контактів з сервера за допомогою токену
      const contacts = await sendGetContactsRequest(userToken);
      // Оновіть список контактів в сторінці
      dispatch(updateContacts(contacts));
    };

    getContacts();
  }, [userToken, dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async (id) => {
    try {
      // Видалення контакту з використанням токену авторизованого користувача
      await deleteContactApi(id, userToken);
      dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <ul className={s.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={s.item}>
          <p className={s.text}>
            {contact.name}: {contact.number}
          </p>
          <button
            type="button"
            onClick={() => handleDeleteContact(contact.id)}
            className={s.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
