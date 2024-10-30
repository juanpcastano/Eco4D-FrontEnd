// cuando haya backend se debe implementar el login aquí con jwt

import { credentials } from "../models/credentials.model";
import { registerInfo } from "../models/registerInfo";

export const ApiCallLogin = async (credentials: credentials) => {
  const result = await fetch("www.eco4D.com/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }).then();
  console.log(result);//cuando esté listo en vez de consolelogear debe retornar la info del usuario
  return { auth: { token: "1234" }, user: { role: "patient" } };
};
export const ApiCallRegister = async (registerInfo: registerInfo) => {
  const result = await fetch("www.eco4D.com/api/register", {
    method: "POST",
    body: JSON.stringify(registerInfo),
  }).then();
  console.log(result);
  return { auth: { token: "1234" }, user: { role: "patient" } };
};
