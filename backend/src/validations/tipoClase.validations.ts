import { z } from 'zod';

export const createTipoClaseSchema = z.object({
    nombre: z.string()
});

export const updateTipoClaseSchema = createTipoClaseSchema.partial();