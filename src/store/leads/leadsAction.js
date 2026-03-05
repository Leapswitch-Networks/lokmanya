import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const getLeadList = createAsyncThunk('get/lead', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/leadList', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const addLead = createAsyncThunk('add/lead', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/add-lead', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const addSampleCollection = createAsyncThunk('add/SampleCollection', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/sample-collection', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const bookanappointment = createAsyncThunk('add/bookanappointment', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/book-an-appointment', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const feedback = createAsyncThunk('add/feedback', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/feedback', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const addHomeCareServices = createAsyncThunk('add/HomeCareServices', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/home-care-service', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const addCallBackRequest = createAsyncThunk('add/CallBackRequest', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/call-back-request', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const exportData = createAsyncThunk('get/export-data-lead', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/export-data-lead', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const surakshakawach = createAsyncThunk('add/surakshakawach', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.post('/suraksha-kawach', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.errors, message: error?.response?.data?.message || error?.error?.message });
  }
});