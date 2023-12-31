import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from '@/app/lib/constants';

axios.defaults.baseURL = SERVER_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', newUser);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const resendCode = createAsyncThunk(
  'auth/resend',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('/auth/resend', { email });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const verifyCode = createAsyncThunk(
  'auth/verify',
  async (code, thunkAPI) => {
    try {
      const response = await axios.post('/auth/verify', code);
      token.set(response.data.token);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const logIn = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', user);
    token.set(response.data.token);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
      status: e.response.status,
    });
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    token.set('');
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
      status: e.response.status,
    });
  }
});

export const updateUser = createAsyncThunk(
  'users/update',
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch('/users/update', data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const updateAddress = createAsyncThunk(
  'users/update/address',
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch('/users/update/address', data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const refreshUser = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      token.set(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (updateUser, thunkAPI) => {
    try {
      const response = await axios.delete('/users', updateUser);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
