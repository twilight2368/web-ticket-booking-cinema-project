import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_info: localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null,
  user_id: localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : "",
  token: localStorage.getItem("jwt") ? localStorage.getItem("jwt") : "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setuserId: (state, action) => {
      state.user_id = action.payload;
      localStorage.setItem("user_id", action.payload);
    },
    setUserInfo: (state, action) => {
      state.user_info = action.payload;
      localStorage.setItem("user_info", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("jwt", action.payload); // Persist token to localStorage
    },
    clearToken: (state, action) => {
      state.token = "";
      localStorage.clear("jwt");
    },
    clearUserInfor: (state, action) => {
      state.user_info = null;
      state.user_id = "";
      state.token = "";
      localStorage.clear("user_info");
      localStorage.clear("user_id");
      localStorage.clear("jwt");
    },
  },
});

export const { setUserInfo, setuserId, setToken, clearUserInfor, clearToken } =
  UserSlice.actions;

export default UserSlice.reducer;
