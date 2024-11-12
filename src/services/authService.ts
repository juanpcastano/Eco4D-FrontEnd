// cuando haya backend se debe implementar el login aquí con jwt

import { credentials } from "../models/credentials.model";
import { registerInfo } from "../models/registerInfo";
import Eco4DApi from "../api/Eco4DApi";

Eco4DApi.post("/auth/login", {});
export const ApiCallLogin = async (credentials: credentials) => {
  try {
    const result = await Eco4DApi.post("/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = result.data;
    return data;
  } catch (err) {
    console.log(err)
    return err
  }
};
export const ApiCallRegister = async (registerInfo: registerInfo) => {
  try {
   
    registerInfo.identificacion = Number(registerInfo.identificacion)    
    const result = await Eco4DApi.post("/auth/register", registerInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = result.data;
    return data;
  } catch (err) {
    console.log(err)
    return err
  }
};
export const ApiCallLogout = async () => {
  try {
    const result = await Eco4DApi.post("/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = result.data;
    return data;
  } catch (err) {
    console.log(err)
    return err
  }
};