
export interface ClaseEspecifica {
    id: number,
    diaHora: Date,
    cantmax: number,
    tipoClaseId: number
}

export interface ClaseEspecificaListadoFront extends ClaseEspecifica {
  estado: "Pendiente" | "Finalizada",
  cantidadReservas: number
}

export interface CreateClaseEspecifica {
    diaHora: Date,
    cantmax: number,
    tipoClaseId: number
}

export interface CreateClaseEspecificaConPatron {
    fechaInicio: string,
    fechaFin: string,
    diasSemana: string[],
    hora: string,
    cantmax: number,
    tipoClaseId: number
}

export interface UpdateClaseEspecifica {
    diaHora?: Date,
    cantmax?: number,
    tipoClaseId?: number
}

export interface ClaseEspecificaResponse {
    claseEspecifica: ClaseEspecifica,
    message: string
}

export interface ClaseEspecificaConPatronResponse {
    message: string,
    total: number
}

export interface ClaseEspecificaListResponse {
    clasesEspecificas: ClaseEspecifica[],
    total: number
}