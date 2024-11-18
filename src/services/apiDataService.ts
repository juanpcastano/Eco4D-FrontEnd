import Eco4DApi from "../api/Eco4DApi"

export const ApiCallObtenerDiagnosticos = async () => {
  try {
    const result = await Eco4DApi.get("/diagnosticos/mis-diagnosticos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener diagnósticos:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};

export const ApiCallObtenerPacientes = async () => {
  try {
    const result = await Eco4DApi.get("/usuarios/pacientes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener pacientes:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};

export const ApiCallSubirDiagnostico = async (diagnostico:any) => {
  try {
    const result = await Eco4DApi.post("/diagnosticos", diagnostico, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al subir diagnóstico:", err);
    throw err; // Lanzar el error para manejarlo en el componente
  }
};

export const ApiCallObtenerDiagnosticoPorId = async (id: string) => {
  try {
    const result = await Eco4DApi.get(`/diagnosticos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener diagnóstico:", err);
    throw err;
  }
};