import { z } from 'zod';

export const createUserSchema = z.object({

    nombre: z.string()
    .min(1,'Se requiere el nombre del usuario'),

    apellido: z.string()
    .min(1,'Se requiere el apellido del usuario'),

    dni: z.number()
    .int('El dni del usuario debe ser un numero entero')
    .positive('El dni del usuario debe ser un numero positivo'),

    fechaNacimiento: z.iso.datetime({ local:true }),

    email: z.email(),

    foto: z.string()
    .min(1,'Se requiere la foto del usuario'),

    rol: z.string()
    .min(1,'Se requiere el rol del usuario'),

    password: z.string()
    .min(1,'Se requiere una contraseña'),
});

export const updateUserSchema = createUserSchema.partial();