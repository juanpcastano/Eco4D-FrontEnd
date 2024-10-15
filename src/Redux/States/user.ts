import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user.model";

export const EmptyUserState: UserInfo = {
  id: 0,
  name: "",
  country: "",
  phone: "",
  city: "",
  email: "",
  role: "",
};

export const persistLocalStoregeUser = (userInfo: UserInfo) => {
  localStorage.setItem("user", JSON.stringify({ ...userInfo }));
};

export const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStoregeUser(action.payload)
      return action.payload;
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStoregeUser(result)
      return result;
    },
    resetUser: () => {
      localStorage.removeItem("user")
      return EmptyUserState;
    },
  },
});

export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
