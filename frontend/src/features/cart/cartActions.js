import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const getCart = createAsyncThunk('cart/fetchCart', async (id, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.get(`${apiUrl}/api/cart/${id}`, config); // Hapus `:` sebelum `${id}`
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (data, { rejectWithValue }) => {
  const { userId, productId, quantity } = data;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `${apiUrl}/api/cart/${userId}`, // Hapus `:` sebelum `${userId}`
      { productId, quantity },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || 'Failed to add to cart');
  }
});

export const updateCart = createAsyncThunk('cart/update', async (data, { rejectWithValue }) => {
  const { userId, productId, qty } = data;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.put(`${apiUrl}/api/cart/${userId}`, { productId, qty }, config); // Hapus `:` sebelum `${userId}`
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || 'Failed to update cart');
  }
});

export const deleteCartItem = createAsyncThunk(
  'cart/deleteFromCart',
  async (data, { rejectWithValue }) => {
    const { userId, productId } = data;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.delete(
        `${apiUrl}/api/cart/${userId}/${productId}`, // Hapus `:` sebelum `${userId}`
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Failed to delete cart item');
    }
  }
);
