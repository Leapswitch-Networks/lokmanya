import { createSlice } from "@reduxjs/toolkit";
import { addLead, getLeadList } from "./leadsAction";

const initialState = {
    loading: true,
    leads: [],
    error: null,
};
const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLeadList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLeadList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.leads = action?.payload?.data;
            })
            .addCase(getLeadList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })
            .addCase(addLead.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLead.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.leads = {action?.payload?.data};
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })

            .addCase(addSampleCollection.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSampleCollection.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.leads = {action?.payload?.data};
            })
            .addCase(addSampleCollection.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })

            .addCase(addHomeCareServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(addHomeCareServices.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.leads = {action?.payload?.data};
            })
            .addCase(addHomeCareServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })

            .addCase(addCallBackRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCallBackRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                // state.leads = {action?.payload?.data};
            })
            .addCase(addCallBackRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })
    }
})
export const { setFilterData } = leadsSlice.actions;
export default leadsSlice.reducer;