import { createSlice } from "@reduxjs/toolkit";
import { FetchHRRole, getEMP, getEmpInfo, saveEmp, saveModifyJamiatInfo, saveModifyRespInfo, updateEmp, verifyUser } from "./empAction";

const initialState = {
  loading: true,
  employees: [],
  error: null,
  pagination: {
    perPage: 50,
    totalRows: 0,
    currentPage: 1
  }
};

const empSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updatePagination: (state, { payload }) => {
      state.pagination = { ...state.pagination, ...payload }
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEMP.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEMP.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action?.payload?.data;
        state.error = null;
      })
      .addCase(getEMP.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(saveEmp.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveEmp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(updateEmp.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(FetchHRRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchHRRole.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(FetchHRRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(getEmpInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmpInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getEmpInfo.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem('accessToken');
        state.error = null;
        state.error = action?.payload?.error;
      })
      .addCase(saveModifyRespInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveModifyRespInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveModifyRespInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
      .addCase(saveModifyJamiatInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveModifyJamiatInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveModifyJamiatInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
  },
});

export default empSlice.reducer;
export const { updatePagination } = empSlice.actions;
