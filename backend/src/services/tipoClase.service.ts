import { TipoClase, CreateTipoClaseRequest, UpdateTipoClaseRequest } from "../types/tipoClase.types";
import prisma from "../config/prisma";

export async function getAllTiposClase(): Promise<TipoClase[]> {
    const tiposClase = await prisma.tipoClase.findMany({
        orderBy: { id: 'asc'}
    })
    return tiposClase;
}

export async function getTipoClaseById(id: number): Promise<TipoClase> {
    const tipoClase = await prisma.tipoClase.findUnique({ where: { id }})
    if (!tipoClase) {
        const error = new Error('Tipo de clase no encontrada');
        (error as any).statusCode = 404;
        throw error;
    }
    return tipoClase
}

export async function createTipoClase(data: CreateTipoClaseRequest): Promise<TipoClase> {
    const created = await prisma.tipoClase.create({
        data: {
            nombre: data.nombre
        }
    })
    return created; 
}

export async function updateTipoClase(id: number, data: UpdateTipoClaseRequest): Promise<TipoClase> {
    const updated = await prisma.tipoClase.update({
      where: { id },
      data: {
       ...(data.nombre !== undefined ? { nombre: data.nombre } : {})
      },
    });
    return updated
}

export async function deleteTipoClase(id: number): Promise<TipoClase> {
    const deleted = await prisma.tipoClase.delete({ where: { id } })
    if (!deleted) {
        const error = new Error('Tipo de clase no encontrada');
        (error as any).statusCode = 404;
        throw error;
    }
    return deleted;
}