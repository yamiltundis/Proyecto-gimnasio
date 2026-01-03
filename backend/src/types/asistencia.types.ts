export interface Asistencia {
    id: number,
    fechaHora: Date,
    clienteId: number
}

export interface CreateAsistenciaRequest {
    fechaHora: Date,
    clienteId: number
}

export interface UpdateAsistenciaRequest {
    fechaHora?: Date,
    clienteId?: number
}

export interface AsistenciaResponse {
    asistencia: Asistencia,
    message: string
}

export interface AsistenciaListResponse {
    asistencias: Asistencia[],
    total: number
}