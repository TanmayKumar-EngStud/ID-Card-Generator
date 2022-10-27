import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";
export const store = configureStore({
 reducer: {
  user: userReducer,
 },
});
