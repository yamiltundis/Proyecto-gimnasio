export interface Usuario {
    id: number,
    nombre: string,
    apellido: string;
    dni: number,
    fechaNacimiento: Date,
    email: string,
    foto: string,
    rol: string
}

export interface CreateUsuarioRequest {
    nombre: string,
    apellido: string;
    dni: number,
    fechaNacimiento: Date,
    email: string,
    foto: string,
    rol: string
}

export interface UpdateUsuarioRequest {
    nombre?: string,
    apellido?: string;
    dni?: number,
    fechaNacimiento?: Date,
    email?: string,
    foto?: string,
    rol?: string
}

export interface UsuarioResponse {
    usuario: Usuario,
    message: string
}

export interface UsuarioListResponse {
    usuarios: Usuario[],
    total: number
}