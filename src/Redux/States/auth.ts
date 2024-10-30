import { createSlice } from "@reduxjs/toolkit";
import { AuthInfo } from "../../models/auth.model";

export const EmptyAuthState: AuthInfo = {
  token: "",
};


export const authSlice = createSlice({
  name: "auth",
  initialState: EmptyAuthState,
  reducers: {
    createAuth: (state, action) => {
      return action.payload;
    },
    updateAuth: (state, action) => {
      const result = { ...state, ...action.payload };
      return result;
    },
    resetAuth: () => {
      return EmptyAuthState;
    },
  },
});

export const { createAuth, updateAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
