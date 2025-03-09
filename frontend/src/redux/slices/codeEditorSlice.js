import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Collaborator: [],
    currentFile: null,
    ifcurrentFileOpen: false,
}

const codeEditorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        addCollaborator: (state, action) => {
            state.Collaborator = action.payload;
        },
        filesOpens: (state, action) => {
            state.currentFile = action.payload.currentFile;
            state.ifcurrentFileOpen = false;
        },
        currentFileOpen: (state, action) => {
            if (state.currentFile == action.payload.file) {
                state.ifcurrentFileOpen = true;
            } else {
                state.currentFile == action.payload.file
            }
        }
    }
})

export const { addCollaborator, filesOpens, currentFileOpen } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;