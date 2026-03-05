import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';
import { errorToast } from './../../utils/Toast';
import { login } from '@/ApiActions/CommonApi';


export const loginUser = createAsyncThunk('user/login', async ({
	username, password

}, { rejectWithValue }) => {
	try {

		// const response = await axiosConfig.post('login', {
		// 	username,
		// 	password
		// });

		const jsonPayload = {
			username,
			password
		};

		const response = await login(jsonPayload, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const verifyUserDetails = createAsyncThunk('user/verify', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('api/verify/user');
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.get('logout');
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const forgotPassword = createAsyncThunk('user/forgotPassword', async ({ email }, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('forgot-password', { email });
		if (response.success === 0) return errorToast(`${response.message} failed`)
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const modifyPassword = createAsyncThunk('user/modifyPassword', async ({ password, token }, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('set-password', { password, token });
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});

export const verifyPolicy = createAsyncThunk('user/verifyPolicy', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('verify-policy');
		return await response.data;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});
export const changePassword = createAsyncThunk('user/changePassword', async ({ formData, modalHideRef }, { rejectWithValue }) => {
	try {
		await axiosConfig.put("change-password", formData);
		return modalHideRef;
	} catch (error) {
		return rejectWithValue({ error: error?.response?.data?.error, message: error?.response?.data?.message || error?.error?.message });
	}
});