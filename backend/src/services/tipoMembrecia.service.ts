import { TipoMembrecia, CreateTipoMembrecia, UpdateTipoMembrecia } from '../types/tipoMembrecia.types'
import prisma from "../config/prisma";

export async function getAllTiposMembrecias(): Promise<TipoMembrecia[]> {
    const tipos = await prisma.tipoMembrecia.findMany({
        orderBy: { dias: 'asc'}
    })
    return tipos;
}

export async function getTipoMembreciaById(id: number): Promise<TipoMembrecia> {
    const tipo = await prisma.tipoMembrecia.findUnique({ where: { id }});
    if (!tipo) {
        const error = new Error('Tipo de membrecia no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return tipo;
}

export async function createTipoMembrecia(data: CreateTipoMembrecia): Promise<TipoMembrecia> {
    const newTipo = await prisma.tipoMembrecia.create({
        data: {
            nombre: data.nombre,
            dias: data.dias
        }
    });
    return newTipo;
}

export async function updateTipoMembrecia(id: number, data: UpdateTipoMembrecia): Promise<TipoMembrecia> {
    const updatedTipo = await prisma.tipoMembrecia.update({
        where: { id },
        data: {
            ...(data.nombre != undefined ? { nombre: data.nombre} : {}),
            ...(data.dias != undefined ? { dias: data.dias } : {})
        }
    });
    return updatedTipo;
}

export async function deleteTipoMembrecia(id: number): Promise<TipoMembrecia> {
    const deletedTipo = await prisma.tipoMembrecia.delete({ where: { id }});
    if (!deletedTipo) {
        const error = new Error('Tipo de membrecia no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedTipo;
}