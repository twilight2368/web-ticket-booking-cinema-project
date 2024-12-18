import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./stores/UserSlice";
import adminReducer from "./stores/AdminSlice";

export const store = configureStore({
  reducer: {
    //todo: all reducers place here
    user: userReducer,
    admin: adminReducer,
  },
});
