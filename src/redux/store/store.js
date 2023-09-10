import { configureStore } from '@reduxjs/toolkit';
import { validateContactMiddleware } from '../../redux/middleware/ValidationMiddleware';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import contactsReducer from '../contactsSlice/contactsSlice';
import authReducer from '../auth/authSlice';
import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root', 
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(validateContactMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };