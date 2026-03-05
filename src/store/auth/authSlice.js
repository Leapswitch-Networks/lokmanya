import { createSlice } from '@reduxjs/toolkit';
import {
	changePassword,
	forgotPassword,
	loginUser,
	logoutUser,
	modifyPassword,
	verifyPolicy,
	verifyUserDetails,
} from './authActions';

// ✅ Safely access localStorage only in the browser
const accessToken = typeof window !== "undefined" ? localStorage.getItem('accessToken') : null;

const initialState = {
	loading: false,
	user: null,
	modules: [],
	accessToken: accessToken,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			if (typeof window !== 'undefined') {
				localStorage.setItem('accessToken', action.payload.accessToken);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.accessToken) {
					state.user = action.payload.user;
					state.modules = action.payload.modules;
					state.accessToken = action.payload.accessToken;
					if (typeof window !== 'undefined') {
						localStorage.setItem('accessToken', action.payload.accessToken);
					}
				}
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.accessToken = null;
				state.error = null;
				if (typeof window !== 'undefined') {
					localStorage.removeItem('accessToken');
				}
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(changePassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(changePassword.fulfilled, (state, { payload }) => {
				payload?.current?.click();
				state.loading = false;
				state.user = null;
				state.accessToken = null;
				state.error = null;
				if (typeof window !== 'undefined') {
					localStorage.removeItem('accessToken');
				}
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(verifyUserDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(verifyUserDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action?.payload?.user;
				state.modules = action?.payload?.modules;
				state.error = null;
			})
			.addCase(verifyUserDetails.rejected, (state, payload) => {
				state.loading = false;
				state.accessToken = null;
				state.user = null;
				state.error = payload.error;
				if (typeof window !== 'undefined') {
					localStorage.removeItem('accessToken');
				}
			})
			.addCase(forgotPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.loading = false;
				state.accessToken = null;
				state.error = null;
			})
			.addCase(forgotPassword.rejected, (state, payload) => {
				state.loading = false;
				state.accessToken = null;
				state.error = payload.error;
			})
			.addCase(modifyPassword.pending, (state) => {
				state.loading = true;
			})
			.addCase(modifyPassword.fulfilled, (state) => {
				state.loading = false;
				state.accessToken = null;
				state.error = null;
				if (typeof window !== 'undefined') {
					localStorage.removeItem('accessToken');
				}
			})
			.addCase(modifyPassword.rejected, (state, payload) => {
				state.loading = false;
				state.accessToken = null;
				state.error = payload.error;
			})
			.addCase(verifyPolicy.pending, (state) => {
				state.loading = true;
			})
			.addCase(verifyPolicy.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.user.tnc_verify = payload?.tnc_verify;
			})
			.addCase(verifyPolicy.rejected, (state, payload) => {
				state.loading = false;
				state.accessToken = null;
				state.error = payload.error;
			});
	},
});

export default authSlice.reducer;

export const { setCredentials } = authSlice.actions;
