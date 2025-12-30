export interface TipoClase {
    id: number,
    nombre: string
}

export interface CreateTipoClaseRequest {
    nombre: string
}

export interface UpdateTipoClaseRequest {
    nombre?: string
}

export interface TipoClaseResponse {
    tipoClase: TipoClase,
    message: string
}

export interface TipoClaseListResponse {
    tiposClase: TipoClase[],
    total: number
}