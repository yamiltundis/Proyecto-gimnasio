export interface Pago {
    id: number,
    monto: number,
    fecha: Date,
    clienteId: number,
    tipoMembreciaId: number
}

export interface CreatePagoRequest {
    fecha: Date,
    clienteId: number,
    tipoMembreciaId: number
}

export interface UpdatePagoRequest {
    fecha?: Date
    clienteId?: number,
    tipoMembreciaId?: number
}

export interface PagoResponse {
    pago: Pago,
    message: string
}

export interface PagoListResponse {
    pagos: Pago[],
    total: number
}