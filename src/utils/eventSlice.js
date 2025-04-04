import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: null,
  reducers: {
    showEvents: (state, action) => action.payload,
    removeEvents: (state, action) => null,
  },
});

export const { showEvents, removeEvents } = eventSlice.actions;

export default eventSlice.reducer;
