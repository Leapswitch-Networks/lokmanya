import { createSlice } from "@reduxjs/toolkit";
import { getDoctors, getCategoryDetails, checkCategoryDetails } from "./categoryAction";

const initialState = {
    loading: true,
    doctors: {category:null},
    category: null,
    error: null,
    filterData: {
        city: null,
        specialty: null,
        area: null,
        department: null,
        education: null,
        opdTiming: null,
        status: null,
    }
};
const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDoctors.pending, (state) => {
            state.loading = true;
        })
        .addCase(getDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.doctors = action?.payload?.data;
        })
        .addCase(getDoctors.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error;
        })

        .addCase(getCategoryDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCategoryDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action?.payload;
            state.error = null;
        })
        .addCase(getCategoryDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error;
        })
        .addCase(checkCategoryDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(checkCategoryDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(checkCategoryDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.error;
        })
    }
})
export const { setFilterData } = doctorSlice.actions;
export default doctorSlice.reducer;