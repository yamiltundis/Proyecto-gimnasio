import { homedir } from 'node:os';
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

export const createClaseEspecificaConPatronSchema = z.object({
    fechaInicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (YYYY-MM-DD)"),
    fechaFin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (YYYY-MM-DD)"),
    hora: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida (HH:MM)"),
    cantmax: z.number()
    .int('Cupo de participantes inválido')
    .positive('El cupo de participantes debe ser positivo'),
    tipoClaseId: z.number()
    .int('ID de tipo de clase inválido')
    .positive('El ID del tipo de clase debe ser positivo'),
    diasSemana: z.array(z.string())
});

export const updateClaseEspecificaConPatronSchema = createClaseEspecificaSchema.partial();