import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from '../types/usuario.types'
import prisma from '../config/prisma'

let usuarios : Usuario[] = [
    { id: 1, nombre: 'Yamil', apellido: 'Tundis', dni: 45910179, fechaNacimiento: new Date(2004, 7, 10), 
        email: 'yamiltundis6@gmail.com', foto: 'foto', rol: 'cliente'},
    { id: 2, nombre: 'Pri', apellido: 'Paroni', dni: 47401190, fechaNacimiento: new Date(2006, 6, 3), 
        email: 'prichu@gmail.com', foto: 'fotopri', rol: 'cliente'}
]

export async function getAllUsuarios() : Promise<Usuario[]> {
    const usuario = await prisma.cliente.findMany({
        orderBy: { id: 'asc'}
    })
    return usuario;
}

export async function getUsuarioById(id: number): Promise<Usuario> {
    const usuario = await prisma.cliente.findUnique({ where: { id } })
    if (!usuario) {
      const error = new Error('Usuario not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return usuario;
}

export async function createUsuario(data: CreateUsuarioRequest): Promise<Usuario> {
    const created = await prisma.cliente.create({
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            fechaNacimiento: data.fechaNacimiento,
            email: data.email,
            foto: data.foto,
            rol: data.rol
        }
    })
    return created; 
}

export async function updateUsuario(id: number, data: UpdateUsuarioRequest): Promise<Usuario> {
    const updated = await prisma.cliente.update({
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
    const deleted = await prisma.cliente.delete({ where: { id } })
    if (!deleted) {
        const error = new Error('Usuario no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    return deleted;
}