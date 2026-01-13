import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from '../types/usuario.types'
import prisma from '../config/prisma'

export async function getAllUsuarios() : Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany({
        orderBy: { id: 'asc' },
        where: { rol: 'cliente' }
    })
    return usuarios;
}

export async function getUsuarioById(id: number): Promise<Usuario> {
    const usuario = await prisma.usuario.findUnique({ where: { id } })
    if (!usuario) {
      const error = new Error('Usuario not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return usuario;
}

export async function createUsuario(data: CreateUsuarioRequest): Promise<Usuario> {
    const created = await prisma.usuario.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            fechaNacimiento: new Date(data.fechaNacimiento),
            email: data.email,
            foto: data.foto,
            rol: 'cliente'
        }
    })
    return created; 
}

export async function updateUsuario(id: number, data: UpdateUsuarioRequest): Promise<Usuario> {
    const updated = await prisma.usuario.update({
      where: { id },
      data: {
       ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
       ...(data.apellido !== undefined ? { apellido: data.apellido } : {}),
       ...(data.dni !== undefined ? { dni: data.dni } : {}),
       ...(data.fechaNacimiento !== undefined ? { fechaNacimiento: data.fechaNacimiento } : {}),
       ...(data.email !== undefined ? { email: data.email } : {}),
       ...(data.foto !== undefined ? { foto: data.foto } : {}),
       ...(data.rol !== undefined ? { rol: data.rol } : {}),
      },
    });
    return updated
}

export async function deleteUsuario(id: number): Promise<Usuario> {
    const deleted = await prisma.usuario.delete({ where: { id } })
    if (!deleted) {
        const error = new Error('Usuario no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    return deleted;
}