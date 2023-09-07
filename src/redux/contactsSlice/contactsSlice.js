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
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchContacts.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchContacts.fulfilled, (state, { payload }) => {
    //     state.items = payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(fetchContacts.rejected, (state, { error }) => {
    //     state.isLoading = false;
    //     state.error = error.message;
    //   });
  },
});

export const { addContact, resetContacts, deleteContact, changeFilter, updateContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
