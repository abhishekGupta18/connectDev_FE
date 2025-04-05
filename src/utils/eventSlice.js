import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: null,
  reducers: {
    addEvents: (state, action) => action.payload,
    removeEvents: (state, action) => null,
  },
});

export const { addEvents, removeEvents } = eventSlice.actions;

export default eventSlice.reducer;
