import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const getuserReviews = createAsyncThunk(
  'getUser/reviews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/reviews`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const getProductReviews = createAsyncThunk(
  'get/reviews',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/reviews/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const addProductReview = createAsyncThunk(
  'add/reviews',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/products/reviews/${formData.get('id')}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  'delete/review',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/products/reviews/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
