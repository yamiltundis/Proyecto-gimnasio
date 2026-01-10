import { z } from 'zod';

export const createPagoSchema = z.object({
    fecha: z.iso.datetime({ local: true }),
    clienteId: z.number()
    .int('ID del cliente inválido')
    .positive('ID del cliente debe ser positivo'),
    tipoMembreciaId: z.number()
    .int('ID de tipo de membrecia inválido')
    .positive('El ID del tipo de membrecia debe ser positivo'),
});

export const updatePagoSchema = createPagoSchema.partial();