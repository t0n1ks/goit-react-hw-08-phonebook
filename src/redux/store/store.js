import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../contactsSlice/contactsSlice';
import { validateContactMiddleware } from '../../redux/middleware/ValidationMiddleware';
import authReducer from '../auth/authSlice'; 

const rootReducer = {
  contacts: contactsReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(validateContactMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
