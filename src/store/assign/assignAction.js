import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';


export const getAssign = createAsyncThunk('assign/get', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosConfig.get('get-assign');
        return response.data;
    } catch (error) {
        return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
});

export const saveAssign = createAsyncThunk('assign/save', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosConfig.post('save-assign', data);
        return response.data;
    } catch (error) {
        return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
});

export const updateAssign = createAsyncThunk('assign/update', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosConfig.patch('update-user-assign', data);
        return response.data;
    } catch (error) {
        return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
    }
});
