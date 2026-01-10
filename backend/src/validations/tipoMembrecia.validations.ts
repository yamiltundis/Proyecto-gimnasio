import { z } from 'zod';

export const createTipoMembreciaSchema = z.object({
    nombre: z.string(),
    dias: z.number()
    .int('Cantidad de dias inválidos')
    .positive('La cantidad de dias debe ser positivo')
});

export const updateTipoMembreciaSchema = createTipoMembreciaSchema.partial();