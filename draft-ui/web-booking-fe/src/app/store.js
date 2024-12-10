import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./stores/UserSlice";
import cartReducer from "./stores/CartSlice";

export const store = configureStore({
  reducer: {
    //todo: all reducers place here
    user: userReducer,
    cart: cartReducer,
  },
});