export interface ListaPrecio {
    id: number,
    monto: number,
    diaInicial: Date,
    tipoMembreciaId: number
}

export interface CreateListaPrecio {
    monto: number,
    diaInicial: Date,
    tipoMembreciaId: number    
}

export interface UpdateListaPrecio {
    monto?: number,
    diaInicial?: Date,
    tipoMembreciaId?: number    
}

export interface ListaPrecioResponse {
    listaprecio: ListaPrecio,
    message: string
}

export interface ListaPrecioListResponse {
    listasprecios: ListaPrecio[],
    total: number
}