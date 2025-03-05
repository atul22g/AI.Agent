import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ActivityBarOption: 'files',
    Explorer: 'open'
}

const settingSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        ActivityBartoggle: (state, action) => {
            state.ActivityBarOption = action.payload;
            state.Explorer = 'open';
        },
        ExplorerClosed: (state) => {
            state.ActivityBarOption = 'none';
            state.Explorer = 'close';
        }
    }
})

export const { ActivityBartoggle, ExplorerClosed } = settingSlice.actions;

export default settingSlice.reducer;