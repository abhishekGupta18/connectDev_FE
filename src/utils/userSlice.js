import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },

    removeUser: (state, action) => {
      return null;
    },
    updateUserWithPremium: (state, action) => {
      return { ...state, isPremium: true };
    },
  },
});

export const { addUser, removeUser, updateUserWithPremium } = userSlice.actions;

export default userSlice.reducer;
