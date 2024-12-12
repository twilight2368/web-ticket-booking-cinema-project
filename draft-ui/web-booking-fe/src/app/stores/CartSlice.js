import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: sessionStorage.getItem("cart_seats")
    ? JSON.parse(sessionStorage.getItem("cart_seats"))
    : [],
  total_price: 0,
  show: sessionStorage.getItem("cart_show")
    ? JSON.parse(sessionStorage.getItem("cart_show"))
    : null,
  movie: sessionStorage.getItem("cart_movie")
    ? JSON.parse(sessionStorage.getItem("cart_movie"))
    : null,
  room: sessionStorage.getItem("cart_room")
    ? JSON.parse(sessionStorage.getItem("cart_room"))
    : null,
};

export const cartSlicer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    seatTotalPrice: (state, action) => {
      state.total_price = action.payload;
    },
    seatTotalPriceFromSeat: (state, action) => {
      const total_price = state.seats.reduce((total, crr) => {
        return total + (crr.seat_type.price ? crr.seat_type.price : 0);
      }, 0);
      state.total_price = state.seats.length ? total_price : 0;
    },

    setSeatList: (state, action) => {
      state.seats = action.payload;
      sessionStorage.setItem("cart_seats", JSON.stringify(action.payload));
    },
    clearSeatsList: (state, action) => {
      state.seats = [];
      sessionStorage.removeItem("cart_seats");
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
      sessionStorage.setItem("cart_movie", JSON.stringify(action.payload));
    },

    clearMovie: (state, action) => {
      state.movie = null;
      sessionStorage.removeItem("cart_movie");
    },
    setRoom: (state, action) => {
      state.room = action.payload;
      sessionStorage.setItem("cart_room", JSON.stringify(action.payload));
    },
    clearRoom: (state, action) => {
      state.room = null;
      sessionStorage.removeItem("cart_room");
    },
    setShow: (state, action) => {
      state.show = action.payload;
      sessionStorage.setItem("cart_show", JSON.stringify(action.payload));
    },
    clearShow: (state, action) => {
      state.show = null;
      sessionStorage.removeItem("cart_show");
    },
    clearAllCart: (state, action) => {
      state.seats = [];
      state.movie = null;
      state.room = null;
      state.show = null;
      state.total_price = 0;
      sessionStorage.removeItem("cart_seats");
      sessionStorage.removeItem("cart_movie");
      sessionStorage.removeItem("cart_room");
      sessionStorage.removeItem("cart_show");
    },
  },
});

export const {
  setSeatList,
  clearSeatsList,
  seatTotalPrice,
  seatTotalPriceFromSeat,
  clearTotalPrice,
  setMovie,
  clearMovie,
  setRoom,
  clearRoom,
  setShow,
  clearShow,
  clearAllCart,
} = cartSlicer.actions;

export default cartSlicer.reducer;
