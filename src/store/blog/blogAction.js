import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const getblog = createAsyncThunk('get/get-blog', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/get-blog', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});
