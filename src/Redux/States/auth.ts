import { createSlice } from "@reduxjs/toolkit";
import { AuthInfo } from "../../models/auth.model";

export const EmptyAuthState: AuthInfo = {
  token: "",
};

export const persistLocalStoregeAuth = (authInfo: AuthInfo) => {
  localStorage.setItem("auth", JSON.stringify({ ...authInfo }));
};

export const authSlice = createSlice({
  name: "auth",
  initialState: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : EmptyAuthState,
  reducers: {
    createAuth: (state, action) => {
      persistLocalStoregeAuth(action.payload);
      return action.payload;
    },
    updateAuth: (state, action) => {
      const result = { ...state, ...action.payload };
      persistLocalStoregeAuth(result)
      return result;
    },
    resetAuth: () => {
      localStorage.removeItem("auth")
      return EmptyAuthState;
    },
  },
});

export const { createAuth, updateAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
