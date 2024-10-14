// cuando haya backend se debe implementar el login aquí con jwt

import { credentials } from "../models/credentials.model"

export const ApiCallLogin = async (credentials: credentials) => {
    const result = await fetch("www.eco4D.com/api/auth",{
        method: "POST",
        body: JSON.stringify(credentials)
    }).then()
    console.log(result)
    return {token: "1234"}
}