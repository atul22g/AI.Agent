import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: null,
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProjects: (state, action) => {
            state.projects = action.payload;
        }
    }
})

export const { addProjects } = projectsSlice.actions;

export default projectsSlice.reducer;