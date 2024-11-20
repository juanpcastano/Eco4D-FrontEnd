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

// Exportar funcion que haga el llamado a la api con el endpoint /soporte/mis-solicitudes para obtener todas las solicitud de soporte
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

// Exportar funcion que haga el llamado a la api con el endpoint /soporte/{id} para obtener una solicitud de soporte por id
export const ApiCallObtenerSolicitudSoportePorId = async (id: string) => {
  try {
    const result = await Eco4DApi.get(`/soporte/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener solicitud de soporte:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
}

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

//exportar la función que haga el llamado a la api con el endpoint /mensajes/nuevo para crear un nuevo mensaje en una solicitud de soporte, el id no es parte del endpoint pero se pasa como parametro
export const ApiCallCrearMensaje = async (id: string, mensaje: string) => {
  try {
    const result = await Eco4DApi.post("/mensajes/nuevo", {
      solicitudId: parseInt(id, 10), // Convertir a número entero
      descripcion: mensaje // Usar 'descripcion' en lugar de 'mensaje'
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al crear mensaje:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
}


// Exportar la función que haga el llamado a la api con el endpoint /mensajes/obtener/{id} para obtener los mensajes de una solicitud de soporte con el id de la solicitud de soporte
export const ApiCallObtenerMensajesPorId = async (id: string) => {
  try {
    const result = await Eco4DApi.get(`/mensajes/obtener/${id}`, {
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


export const ApiCallObtenerUsuarioPorId = async (id:string) => {
  try {
    const result = await Eco4DApi.get("/usuarios/"+id+"", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};


export const ApiCallObtenerDiagnosticosPorIdUsuario = async (id:string) => {
  try {
    const result = await Eco4DApi.get("diagnosticos/usuario/"+id+"", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    throw err; // Lanza el error para que pueda ser manejado en el componente
  }
};