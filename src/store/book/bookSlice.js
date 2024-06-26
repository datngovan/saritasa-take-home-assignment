import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  RecommendBook: {},
  book: {},
  group: "year",
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
    getgroupBy: (state, action) => {
      state.group = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getBook, getRecommendedBook, getgroupBy } = bookSlice.actions;
export default bookSlice.reducer;
