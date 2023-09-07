import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetContacts: () => initialState,

    addContact: (state, { payload }) => ({
      ...state,
      items: [...state.items, payload],
    }),
    updateContacts: (state, { payload }) => ({
      ...state,
      items: payload,
    }),
    deleteContact: (state, { payload }) => ({
      ...state,
      items: state.items.filter(contact => contact.id !== payload),
    }),
    changeFilter: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
  extraReducers: () => {

  },
});

export const { addContact, resetContacts, deleteContact, changeFilter, updateContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
