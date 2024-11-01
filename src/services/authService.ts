// cuando haya backend se debe implementar el login aquí con jwt

import { credentials } from "../models/credentials.model";
import { registerInfo } from "../models/registerInfo";
import Eco4DApi from "../api/Eco4DApi";

Eco4DApi.post("/auth/login",{
  
})
export const ApiCallLogin = async (credentials: credentials) => {
  const result = await Eco4DApi.post("/auth/login",credentials,{
    headers: {
      "Content-Type": "application/json"
    },
  })
  const data = result.data;
  return data;
};
export const ApiCallRegister = async (registerInfo: registerInfo) => {
  const result = await Eco4DApi.post("/auth/register",registerInfo,{
    headers: {
      "Content-Type": "application/json"
    },
  })
  const data = result.data;
  return data;
};
