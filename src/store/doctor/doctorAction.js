import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig, { externalAxios } from '../../utils/axiosConfig';

export const getDoctors = createAsyncThunk('get/doctor', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/doctorsList', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});
export const getDoctorsfrontend = createAsyncThunk('get/doctorfrontend', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/doctorsListfrontend', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});


export const getCategoryDetails = createAsyncThunk('get/category', async (_, { rejectWithValue }) => {
  try {
    const response = await externalAxios.get('/wp-json/wp/v2/categories')
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const checkCategoryDetails = createAsyncThunk('check/category', async ({ blog_id }, { rejectWithValue }) => {
  try {
    const response = await externalAxios.get('/wp-json/wp/v2/posts?categories=' + blog_id)
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const getHyperLocal = createAsyncThunk('get/hyperlocal', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/hyperlocalList', {
      params: filters
    })
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});

export const exportData = createAsyncThunk('get/export-data', async (filters, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get('/export-data', {
      params: filters
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
  }
});
