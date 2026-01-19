import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from '../types/usuario.types';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { getUltimaMembreciaActiva } from './membreciaActiva.service';

export async function getAllUsuarios() : Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany({
        orderBy: { id: 'asc' },
        where: { rol: 'cliente' },
        omit: { password: true }
    })

    const usuariosConMembresia = await Promise.all( 
        usuarios.map(async (u) => {
        try {
          const membresia = await getUltimaMembreciaActiva(u.id);
          return { ...u, membresia };
        } catch {
          return { ...u, membresia: null };
        }
     })
    );

   return usuariosConMembresia;
}

export async function getUsuarioById(id: number): Promise<Usuario> {
    const usuario = await prisma.usuario.findUnique({ where: { id }, omit: { password: true } })
    if (!usuario) {
      const error = new Error('Usuario not found');
      (error as any).statusCode = 404;
      throw error;
    }

    const membresia = await getUltimaMembreciaActiva(id)
    
    const usuarioConMembresia = { ...usuario, membresia}
    
    return usuarioConMembresia;
}

export async function createUsuario(data: CreateUsuarioRequest): Promise<Usuario> {

    const exists = await prisma.usuario.findUnique({ where: { email: data.email }})
    if (exists) {
        const error = new Error('Email ya registrado') as any;
        error.statusCode(409);
        throw error
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const created = await prisma.usuario.create({
        data: {
            ...data,
            password: hashedPassword
        }
    })
    return created; 
}


export async function updateUsuario(id: number, data: UpdateUsuarioRequest): Promise<Usuario> {
    try {
        const updateData: Partial<UpdateUsuarioRequest> = { ...data };
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        } else {
            delete (updateData as any).password;
        }
        return await prisma.usuario.update({
            where: { id },
            data: updateData,
            omit: { password: true }
        });

    } catch (error: any) {
        if (error.code === 'P2025') {
            const error = new Error('Usuario no encontrado') as any;
            error.statusCode = 404;
            throw error;
        }
        throw error;
    }
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