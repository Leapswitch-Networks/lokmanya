import { createSlice } from '@reduxjs/toolkit';
import { getAssign } from './assignAction';


const initialState = {
    loading: true,
    assignedUserList: [],
    UserList: [],
    currentOption: null,
    assignUser: null,
    error: null,
};

const assignSlice = createSlice({
    name: 'assign',
    initialState,
    reducers: {
        setCurrentOption: (state, { payload }) => {
            state.currentOption = payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssign.fulfilled, (state, action) => {
                state.loading = false;
                state.assignedUserList = action?.payload.data
                state.UserList = action?.payload.userList
                state.error = null;
            })
            .addCase(getAssign.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error;
            })
    },
});
export const { setCurrentOption } = assignSlice.actions;
export default assignSlice.reducer;