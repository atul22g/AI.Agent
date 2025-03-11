import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ActivityBarOption: 'files',
    Explorer: 'open',
    AddCollaboratorModal: 'close',
    Terminal: false,
    focused: false

}

const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        ActivityBartoggle: (state, action) => {
            if (state.ActivityBarOption == action.payload) {
                state.ActivityBarOption = 'none';
                state.Explorer = 'close';
            } else {
                state.ActivityBarOption = action.payload;
                state.Explorer = 'open';
            }
        },
        TerminalToggle: (state) => {
            console.log(state.Terminal);

            if (state.focused) {
                state.Terminal = !state.Terminal;
                // console.log("Terminal toggle: " + state.Terminal);
                state.focused = false;
            } else {
                state.focused = true;
            }
            // console.log("Terminal toggle outer");

        },
        AddCollaboratortoggle: (state, action) => {
            state.AddCollaboratorModal = action.payload;

        }
    }
})

export const { ActivityBartoggle, TerminalToggle, AddCollaboratortoggle } = settingSlice.actions;

export default settingSlice.reducer;