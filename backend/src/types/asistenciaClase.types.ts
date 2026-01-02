export interface AsistenciaClase {
    id: number,
    horacheckin: Date,
    clienteId: number,
    claseEspecificaId: number,
    reservaId: number | null
}

export interface CreateAsistenciaClaseRequest {
    horacheckin: Date,
    clienteId: number,
    claseEspecificaId: number
    reservaId: number | null
}

export interface UpdateAsistenciaClaseRequest {
    horacheckin?: Date,
    clienteId?: number,
    claseEspecificaId?: number
    reservaId?: number | null
}

export interface AsistenciaClaseResponse {
    asistencia: AsistenciaClase,
    message: string
}

export interface AsistenciaClaseListResponse {
    asistencias: AsistenciaClase[],
    total: number
}