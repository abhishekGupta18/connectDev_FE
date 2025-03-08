import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});
