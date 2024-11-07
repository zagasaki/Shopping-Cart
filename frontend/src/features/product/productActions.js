import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const fetchProducts = createAsyncThunk('fetch/products', async (_, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.get(`${apiUrl}/api/items`, config);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || 'Failed to fetch products');
  }
});
