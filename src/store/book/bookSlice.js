import { createSlice } from "@reduxjs/toolkit";
import { addBook } from "../../services/bookServices";
import RecommendBook from "../../components/RecommendBook";

const initialState = {
  RecommendBook: [],
  book: {},
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getBook: (state, action) => {
      state.book = action.payload;
    },
    getRecommendedBook: (state, action) => {
      state.RecommendBook = action.payload;
    },
    addBook: (state, action) => {
      state.book = { ...state.book, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getBook, getRecommendedBook } = bookSlice.actions;
export default bookSlice.reducer;
