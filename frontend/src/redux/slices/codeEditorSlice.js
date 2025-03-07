import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Collaborator: []
}

const codeEditorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        addCollaborator: (state, action) => {
            state.Collaborator = action.payload;
        }
    }
})

export const { addCollaborator } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;