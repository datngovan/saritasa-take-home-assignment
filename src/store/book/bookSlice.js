// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   // book: {},
//   // sortedBy: "year",
//   value: 0,
// };
// const bookSlice = createSlice({
//   name: "book",
//   initialState,
//   reducer: {
//     // getBook: (state, action) => {
//     //   state.book = action.payload;
//     // },
//     increment: (state) => {
//       state.value += 1;
//     },
//   },
// });
// export const { increment } = bookSlice.actions;
// export default bookSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  book: {},
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    getBook: (state, action) => {
      state.book = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, getBook } =
  bookSlice.actions;
export default bookSlice.reducer;
