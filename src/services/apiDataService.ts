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

// Exportar funcion que haga el llamado a la api con el endpoint /soporte para crear una solicitud de soporte
export const ApiCallCrearSolicitudSoporte = async (solicitudSoporte: any) => {
  try {
    const result = await Eco4DApi.post("/soporte", solicitudSoporte, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al crear solicitud de soporte:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};

// Exportar funcion que haga el llamado a la api con el endpoint /soporte/mis-solicitudes para obtener toas las solicitud de soporte
export const ApiCallObtenerMisSolicitudesSoporte = async () => {
  try {
    const result = await Eco4DApi.get("/soporte/mis-solicitudes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener mis solicitudes de soporte:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};

export const ApiCallObtenerMensajes = async () => {
  try {
    const result = await Eco4DApi.get("/mensajes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener mensajes:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};