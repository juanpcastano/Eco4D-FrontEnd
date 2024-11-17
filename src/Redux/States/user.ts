import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/user.model";

export const EmptyUserState: UserInfo = {
  identificacion: 0,
  tipoIdentificacion: "",
  nombre_completo: "",
  url_foto_de_perfil: "",
  correo_electronico: "",
  rol: "",
  pais: "",
  ciudad: "",
  fecha_nacimiento: "",
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
    createUser: (_state, action) => {
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
