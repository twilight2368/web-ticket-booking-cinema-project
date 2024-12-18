import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  rooms: null,
  movies: null,
};

export const adminSlicer = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      sessionStorage.setItem("admin", JSON.stringify(action.payload));
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setAdmin, setRooms, setMovies } = adminSlicer.actions;

export default adminSlicer.reducer;
