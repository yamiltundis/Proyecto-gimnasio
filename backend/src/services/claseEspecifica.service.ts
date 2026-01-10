import { ClaseEspecifica, ClaseEspecificaListadoFront ,CreateClaseEspecifica, UpdateClaseEspecifica } from "../types/claseEspecifica.types";
import prisma from "../config/prisma";

export async function getAllClasesEspecificas(tipoClase?: number): Promise<ClaseEspecificaListadoFront[]> {
    const clases = await prisma.claseEspecifica.findMany({
        where: tipoClase ? { tipoClaseId: tipoClase } : {},
        include: { reservas: true, asistenciasClase: true },
        orderBy: { diaHora: 'desc'}
    })

    const clasesConEstado: ClaseEspecificaListadoFront[]= clases.map(clase => ({
      ...clase,
      estado: new Date(clase.diaHora) > new Date() ? "Pendiente" : "Finalizada",
      cantidadReservas: clase.reservas.length,
      cantidadAsistencias: clase.asistenciasClase.length
    }));

    return clasesConEstado;
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