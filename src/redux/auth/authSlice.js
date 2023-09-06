// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendLoginRequest } from 'api/api';

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  // debugger
  try {
    const { token, user } = await sendLoginRequest({ email, password });
    
    // Встановлення isAuthenticated в true та збереження токену
    return {token : token, user : user };
  } catch (error) {

    if(error.response.status === 400 && error.response.data.name === "MongoError") {
      alert ('User already exist')
    }
    else {
     alert ('Registration failed:', error);
  }
  // debugger
  return rejectWithValue({ message: error.message, status: error.response.status });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('https://connections-api.herokuapp.com/users/logout');
    return null;
  } catch (error) {
    throw error;
  }
});


export const register = createAsyncThunk('auth/register', async ({ name, email, password }) => {
  try {
    const response = await axios.post('https://connections-api.herokuapp.com/users/signup', {
      name,
      email,
      password,
    });
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null, // Додавання токену
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      debugger
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token; // Збереження токену
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      debugger
      state.error = action.payload.message;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token; // Збереження токену
      state.error = null;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null; // Очищення токену
      state.error = null;
    });
  },
});

export default authSlice.reducer;
