import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const categoryList = createAsyncThunk('get/categoryList', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/categoryList', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});