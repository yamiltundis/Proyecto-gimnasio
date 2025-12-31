import { ClaseEspecifica, CreateClaseEspecifica, UpdateClaseEspecifica } from "../types/claseEspecifica.types";
import prisma from "../config/prisma";
import { error } from "node:console";

export async function getAllClasesEspecificas(): Promise<ClaseEspecifica[]> {
    const clases = await prisma.claseEspecifica.findMany({
        orderBy: { id: 'asc'}
    })
    return clases;
}

export async function getClaseEspecificaById(id: number): Promise<ClaseEspecifica> {
    const clase = await prisma.claseEspecifica.findUnique({ where: { id }});
    if (!clase) {
        const error = new Error('Clase específica no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return clase
}

export async function createClaseEspecifica(data: CreateClaseEspecifica): Promise<ClaseEspecifica> {
    const newClase = await prisma.claseEspecifica.create({
        data: {
            diaHora: data.diaHora,
            cantmax: data.cantmax,
            tipoClaseId: data.tipoClaseId
        }
    });
    return newClase;
}

export async function updateClaseEspecifica(id: number, data: UpdateClaseEspecifica): Promise<ClaseEspecifica> {
    const updatedClase = await prisma.claseEspecifica.update({
        where: { id },
        data: {
            ...(data.diaHora != undefined ? { diaHora: data.diaHora } : {}),
            ...(data.cantmax != undefined ? { cantmax: data.cantmax } : {}),
            ...(data.tipoClaseId != undefined ? { tipoClaseId: data.tipoClaseId } : {})
        }
    });
    return updatedClase;
}

export async function deleteClaseEspecifica(id: number): Promise<ClaseEspecifica> {
    const deletedClase = await prisma.claseEspecifica.delete({ where: { id }});
    if (!deletedClase) {
        const error = new Error('Clase especifica no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedClase;
}