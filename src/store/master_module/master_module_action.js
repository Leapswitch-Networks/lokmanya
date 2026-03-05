import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const getModuleTypes = createAsyncThunk('module/get_type', async ({ module_slug }, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('get-master-module?module_slug=' + module_slug);
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const getModuleInfo = createAsyncThunk('module/get', async ({ type }, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('master-list?type=' + type );
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const saveModifyModule = createAsyncThunk('module/save_modify', async ({ type, module_slug, masterName, id, city  }, { rejectWithValue }) => {
	try {
		let send_data = {};
		if (id) {
			send_data = { type, module_slug, masterName, id, city  };
		} else {
			send_data = { type, module_slug, masterName, city  };
		}
		const response = await axiosConfig.post('add-master', send_data);
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const deleteModuleInfo = createAsyncThunk('module/delete', async ({ module_type, id }, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('delete-master', { module_type, id });
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});