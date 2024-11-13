import Eco4DApi from "../api/Eco4DApi"

export const ApiCallObtenerDiagnosticos = async () => {
  try {
    const result = await Eco4DApi.get("/diagnosticos/mis-diagnosticos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = result.data;
    return data;
  } catch (err) {
    return err;
  }
};
export const ApiCallObtenerPacientes = async () => {
  try {
    
    const result = await Eco4DApi.get("/usuarios/pacientes", {
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
export const ApiCallSubirDiagnostico = async (diagnostico:any) => {
  try {
    
    const result = await Eco4DApi.post("/diagnosticos", diagnostico, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = result.data;
    return data;
  } catch (err) {
    console.log(err)
    return err
  }
};