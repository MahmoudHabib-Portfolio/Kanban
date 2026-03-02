import { configureStore } from "@reduxjs/toolkit";
import taskSlice from './taskSlice';

export const Store = configureStore({
    reducer: {
        tasks: taskSlice
    }
});