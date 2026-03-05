import { createSlice } from '@reduxjs/toolkit';
import {
	getModuleInfo, getModuleTypes, saveModifyModule,deleteModuleInfo,
} from './master_module_action';

const initialState = {
	loading: false,
	master_module_info: [],
	error: null,
};

const masterModuleSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getModuleTypes.pending, (state) => {
				state.loading = true;
			})
			.addCase(getModuleTypes.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(getModuleTypes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(getModuleInfo.pending, (state) => {
				state.loading = true;
			})
			.addCase(getModuleInfo.fulfilled, (state, action) => {
				state.loading = false;
				state.master_module_info = action?.payload?.data;
				state.error = null;
			})
			.addCase(getModuleInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(saveModifyModule.pending, (state) => {
				state.loading = true;
			})
			.addCase(saveModifyModule.fulfilled, (state, { payload }) => {
				state.loading = false;
				// state.master_module_info = [ payload.data, ...state.master_module_info]
				state.error = null;
			})
			.addCase(saveModifyModule.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			})
			.addCase(deleteModuleInfo.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteModuleInfo.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.master_module_info = payload.data;
				state.error = null;
			})
			.addCase(deleteModuleInfo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.error;
			});
	},
});

export default masterModuleSlice.reducer;