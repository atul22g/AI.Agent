import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios';

export const updateFileTree = createAsyncThunk(
    'project/updateFileTree',
    async (data) => {
        axios.put('/projects/update-file-tree', {
            projectId: data.projectID,
            fileTree: data.fileTree
        })
    }
);


const initialState = {
    projects: null,
    fileTree: null,
    status: 'idle',
    error: null,
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProjects: (state, action) => {
            state.projects = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateFileTree.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateFileTree.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fileTree = action.payload;
            })
            .addCase(updateFileTree.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})

export const { addProjects, addFileTree } = projectsSlice.actions;

export default projectsSlice.reducer;