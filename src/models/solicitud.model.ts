export interface Solicitud {
    id: number;
    titulo: string;
    fechaReporte: string;  // Cambiado de fechaCreacion
    fechaSolucion: string | null;
    tipo: string;
    descripcion: string;
    estado: string;
    solicitanteId: number;
    solicitante?: {  // Añadido el solicitante opcional
        nombre_completo: string;
        correo_electronico: string;
    };
}