import { z } from 'zod';

export const createListaPrecioSchema = z.object({
    diaInicial: z.iso.datetime({ local: true }),
    monto: z.number()
    .int('Monto inválido')
    .positive('El monto debe ser positivo'),
    tipoMembreciaId: z.number()
    .int('ID de tipo de membrecia inválido')
    .positive('El ID del tipo de membrecia debe ser positivo'),
});

export const updateListaPrecioSchema = createListaPrecioSchema.partial();