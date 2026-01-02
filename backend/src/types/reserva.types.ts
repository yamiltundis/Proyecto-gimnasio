export interface Reserva {
    id: number,
    fechaReserva: Date,
    estado: string,
    clienteId: number,
    claseEspecificaId: number
}

export interface CreateReservaRequest {
    fechaReserva: Date,
    clienteId: number,
    claseEspecificaId: number
}

export interface UpdateReservaRequest {
    fechaReserva?: Date,
    estado?: string,
    clienteId?: number,
    claseEspecificaId?: number
}

export interface ReservaResponse {
    reserva: Reserva,
    message: string
}

export interface ReservaListResponse {
    reservas: Reserva[],
    total: number
}