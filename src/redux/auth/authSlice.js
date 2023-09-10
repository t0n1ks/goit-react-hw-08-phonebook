import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendLoginRequest, sendLogoutRequest} from 'api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  // debugger
  try {
    const { token, user } = await sendLoginRequest({ email, password });

    return {token : token, user : user };
  } catch (error) {

    if(error.response.status === 400 && error.response.data.name === "MongoError") {
      toast.warning ('User already exist')
    }
    else {
      toast.error ('Registration failed:', error);
  }
  // debugger
  return rejectWithValue({ message: error.message, status: error.response.status });
  }
});

export const logout = createAsyncThunk('auth/logout', async ({token}, { dispatch, rejectWithValue }) => {
  try {
    debugger
    if (!token) {
      toast.warning('Token is missing');
      return;
    }
    sendLogoutRequest({token});

    dispatch(resetAuth());
    
  } catch (error) {
   
    return rejectWithValue({ message: error.message });
  }
});


export const register = createAsyncThunk('auth/register', async ({ token, user }, {rejectWithValue}) => {
  try {
    return {token : token, user : user };
  } catch (error) {
    return rejectWithValue({ message: error.message });
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // debugger
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token; 
      state.error = null;
    });

    builder.addCase(login.rejected, (state, action) => {
      debugger
      state.error = action.payload.message;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token; 
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
      state.token = null; 
      state.error = null;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
