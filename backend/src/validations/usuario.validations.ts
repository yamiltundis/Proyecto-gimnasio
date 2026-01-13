import { z } from 'zod';

export const createUserSchema = z.object({

    nombre: z.string()
    .min(1,'Se requiere el nombre del usuario'),

    apellido: z.string()
    .min(1,'Se requiere el apellido del usuario')
    .trim(),

    dni: z.number()
    .int('El dni del usuario debe ser un numero entero')
    .positive('El dni del usuario debe ser un numero positivo'),

    fechaNacimiento: z.iso.datetime({ local:true }),

    email: z.email(),

    foto: z.string()
    .min(1,'Se requiere la foto del usuario'),

    rol: z.enum(['cliente', 'admin', 'superadmin']).default('cliente'),

    password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
});

export const updateUserSchema = createUserSchema.partial();