import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import jobsReducer from "./jobSlice";
import eventReducer from "./eventSlice";
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    jobs: jobsReducer,
    events: eventReducer,
  },
});
