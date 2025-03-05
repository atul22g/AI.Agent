import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import projectsSlice from "./slices/projectSlice";
import settingSlice from "./slices/settingSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        projects: projectsSlice,
        setting: settingSlice
    },
});

export default store;