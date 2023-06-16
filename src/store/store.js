import { configureStore } from "@reduxjs/toolkit";
import { dateSlice } from "./dateSlicer";

export const store = configureStore({
    reducer:{
        date: dateSlice.reducer
    }
})