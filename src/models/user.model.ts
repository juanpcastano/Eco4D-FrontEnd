export interface UserInfo{
    identificacion: number,
    tipoIdentificacion: string,
    nombre_completo: string,
    correo_electronico: string,
    rol: string,
    pais: string,
    ciudad: string,
    fecha_nacimiento: string,
    url_foto_de_perfil: string,
}

export interface Usuario {
    id?: number;
    nombre_completo?: string;  // Cambiado para coincidir con la respuesta
    correo_electronico?: string;  // Cambiado para coincidir con la respuesta
}