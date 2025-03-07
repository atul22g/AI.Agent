import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ActivityBarOption: 'files',
    Explorer: 'open',
    AddCollaboratorModal: 'close'
}

const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        ActivityBartoggle: (state, action) => {
            state.ActivityBarOption = action.payload;
            state.Explorer = 'open';
        },
        ExplorerClosed: (state) => {
            state.ActivityBarOption = 'none';
            state.Explorer = 'close';
        },
        AddCollaboratortoggle: (state, action) => {
            state.AddCollaboratorModal = action.payload;
            
        }
    }
})

export const { ActivityBartoggle, ExplorerClosed, AddCollaboratortoggle } = settingSlice.actions;

export default settingSlice.reducer;