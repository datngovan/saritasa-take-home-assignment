import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./book/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
