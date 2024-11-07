import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${apiUrl}/api/register`, // Menggunakan template string yang benar
        { name, email, password },
        config
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const response = await axios.post(
        `${apiUrl}/api/login`, // Menambahkan apiUrl di sini
        { email, password },
        config
      );

      if (response.data.userToken) {
        localStorage.setItem('userToken', response.data.userToken);
      }

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userToken}`
        }
      };

      const { data } = await axios.get(`${apiUrl}/api/profile`, config); // Menambahkan apiUrl di sini

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
