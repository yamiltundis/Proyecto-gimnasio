export interface Pago {
    id: number,
    monto: number,
    dia: Date
}

export interface CreatePagoRequest {
    monto: number,
    dia: Date
}

export interface UpdatePagoRequest {
    monto?: number,
    dia?: Date
}

export interface PagoResponse {
    pago: Pago,
    message: string
}

export interface PagoListResponse {
    pagos: Pago[],
    total: number
}