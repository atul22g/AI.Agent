import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectsSlice from "./slices/projectSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        projects: projectsSlice
    },
});

export default store;