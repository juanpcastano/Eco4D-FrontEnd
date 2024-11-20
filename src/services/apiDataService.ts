//apiDataService

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
    throw err; 
  }
};

export const ApiCallObtenerSolicitudesAbiertas = async () => {
  try {
    const result = await Eco4DApi.get("/soporte/solicitudes-abiertas", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener solicitudes abiertas:", err);
    throw err; 
  }
};

export const ApiCallObtenerSolicitudesCerradas = async () => {
  try {
    const result = await Eco4DApi.get("/soporte/solicitudes-cerradas", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener solicitudes cerradas:", err);
    throw err; 
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
    throw err; 
  }
};

export const ApiCallObtenerMedicos = async () => {
  try {
    const result = await Eco4DApi.get("/usuarios/medicos", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener medicos:", err);
    throw err; 
  }
};

export const ApiCallObtenerAdministradores = async () => {
  try {
    const result = await Eco4DApi.get("/usuarios/administradores", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener medicos:", err);
    throw err; 
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