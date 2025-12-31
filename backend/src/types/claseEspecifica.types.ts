
export interface ClaseEspecifica {
    id: number,
    diaHora: Date,
    cantmax: number,
    tipoClaseId: number
}

export interface CreateClaseEspecifica {
    diaHora: Date,
    cantmax: number,
    tipoClaseId: number
}

export interface UpdateClaseEspecifica {
    diaHora?: Date,
    cantmax?: number,
    tipoClaseId?: number
}

export interface ClaseEspecificaResponse {
    claseEspecifica: ClaseEspecifica
    message: string
}

export interface ClaseEspecificaListResponse {
    clasesEspecificas: ClaseEspecifica[],
    total: number
}