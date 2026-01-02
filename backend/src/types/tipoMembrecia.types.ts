export interface TipoMembrecia {
    id: number,
    nombre: string,
    dias: number
}

export interface CreateTipoMembrecia {
    nombre: string,
    dias: number
}

export interface UpdateTipoMembrecia {
    nombre?: string,
    dias?: number
}

export interface TipoMembreciaResponse {
    tipomembrecia: TipoMembrecia,
    message: string
}

export interface TipoMembreciaListResponse {
    tiposmembrecias: TipoMembrecia[],
    total: number
}