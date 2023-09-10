import { addContact } from '../contactsSlice/contactsSlice'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const validateContactMiddleware = (store) => (next) => (action) => {
  if (action.type === addContact.type) {
    const { payload } = action;

    if (!isFieldsValid(payload.name, payload.number)) {
      toast.warning('Please fill in all fields');
      return;
    }

    const currentState = store.getState();

    if (isContactNameDuplicate(currentState.contacts.items, payload.name)) {
      toast.warning(`${payload.name} already in the contact list!`);
      return;
    }

    if (isContactNumberDuplicate(currentState.contacts.items, payload.number)) {
      toast.warning(`${payload.number} already in the contact list!`);
      return;
    }
  }

  return next(action);
};

const isFieldsValid = (name, number) => {
  return name !== '' && number !== '';
};

const isContactNameDuplicate = (contacts, name) => {
  return contacts.some((contact) => contact.name === name);
};

const isContactNumberDuplicate = (contacts, number) => {
  return contacts.some((contact) => contact.number === number);
};
