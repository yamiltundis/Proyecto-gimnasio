import { z } from 'zod';

export const createAsistenciaClaseSchema = z.object({

    horacheckin: z.iso.datetime({ local: true }),
    clienteId: z.number()
    .int('ID del cliente inválido')
    .positive('ID del cliente debe ser positivo'),
    claseEspecificaId: z.number()
    .int('ID de la clase inválido')
    .positive('ID de la clase debe ser positivo'),
    reservaId: z.number()
    .int('ID de reserva inválido')
    .positive('ID de la reserva debe ser positivo')
    .optional()
})

export const updateAsistenciaClaseSchema = createAsistenciaClaseSchema.partial();