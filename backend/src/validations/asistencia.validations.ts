import { z } from 'zod';

export const createAsistenciaSchema = z.object({

    fechaHora: z.iso.datetime({ local: true }),
    clienteId: z.number()
    .int('ID del cliente inválido')
    .positive('ID del cliente debe ser positivo')
})

export const updateAsistenciaSchema = createAsistenciaSchema.partial();