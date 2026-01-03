import { Asistencia, CreateAsistenciaRequest, UpdateAsistenciaRequest } from "../types/asistencia.types";
import prisma from "../config/prisma";
import { validarMembreciaActiva } from "./validarMembreciaActiva";

export async function getAllAsistencias(): Promise<Asistencia[]> {
    const asistencias = await prisma.asistencia.findMany({
        orderBy: { id: 'asc'}
    })
    return asistencias;
}

export async function getAsistenciaById(id: number): Promise<Asistencia> {
    const asistencia = await prisma.asistencia.findUnique({ where: { id }});
    if (!asistencia) {
        const error = new Error('Asistencia no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return asistencia
}

export async function createAsistencia(data: CreateAsistenciaRequest): Promise<Asistencia> {

  // Verifica que el cliente esté con una membrecia en activo
  await validarMembreciaActiva(data.clienteId, data.fechaHora);

  const newAsistencia = await prisma.asistencia.create({
    data: {
      fechaHora: data.fechaHora,
      clienteId: data.clienteId
    }
  });

  return newAsistencia;
}

export async function updateAsistencia(id: number, data: UpdateAsistenciaRequest): Promise<Asistencia> {
    const updatedAsistencia = await prisma.asistencia.update({
        where: { id },
        data: {
            ...(data.fechaHora != undefined ? { fechaHora: data.fechaHora } : {}),
            ...(data.clienteId != undefined ? { clienteId: data.clienteId } : {})
        }
    });
    return updatedAsistencia;
}

export async function deleteAsistencia(id: number): Promise<Asistencia> {
    const deletedAsistencia = await prisma.asistencia.delete({ where: { id }});
    if (!deletedAsistencia) {
        const error = new Error('Asistencia no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedAsistencia;
}