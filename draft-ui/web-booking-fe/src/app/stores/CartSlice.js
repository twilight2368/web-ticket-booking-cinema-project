import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [],
  total_price: 0,
  show_id: "",
  movie_id: "",
};

export const cartSlicer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setSeatList: (state, action) => {
      state.seats = action.payload;
    },
    clearSeatsList: (state, action) => {
      state.seats = [];
    },
    seatTotalPrice: (state, action) => {
      state.total_price = action.payload;
    },
    clearTotalPrice: (state, action) => {
      state.total_price = 0;
    },

    setMovie: (state, action) => {
      state.movie_id = action.payload;
    },

    clearMovie: (state, action) => {
      state.movie_id = "";
    },
  },
});

export const {
  setSeatList,
  clearSeatsList,
  seatTotalPrice,
  clearTotalPrice,
  setMovie,
  clearMovie,
} = cartSlicer.actions;

export default cartSlicer.reducer;
