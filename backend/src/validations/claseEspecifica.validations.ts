import { z } from 'zod';

export const createClaseEspecificaSchema = z.object({
    diaHora: z.iso.datetime({ local: true }),
    cantmax: z.number()
    .int('Cupo de participantes inválido')
    .positive('El cupo de participantes debe ser positivo'),
    tipoClaseId: z.number()
    .int('ID de tipo de clase inválido')
    .positive('El ID del tipo de clase debe ser positivo'),
});

export const updateClaseEspecificaSchema = createClaseEspecificaSchema.partial();