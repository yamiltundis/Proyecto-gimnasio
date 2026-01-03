import { AsistenciaClase, CreateAsistenciaClaseRequest, UpdateAsistenciaClaseRequest } from "../types/asistenciaClase.types";
import prisma from "../config/prisma";
import { validarMembreciaActiva } from "./validarMembreciaActiva";

export async function getAllAsistenciasClases(): Promise<AsistenciaClase[]> {
    const asistencias = await prisma.asistenciaClase.findMany({
        orderBy: { id: 'asc'}
    })
    return asistencias;
}

export async function getAsistenciaClaseById(id: number): Promise<AsistenciaClase> {
    const asistencia = await prisma.asistenciaClase.findUnique({ where: { id }});
    if (!asistencia) {
        const error = new Error('Asistencia no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return asistencia
}

export async function createAsistenciaClase(data: CreateAsistenciaClaseRequest): Promise<AsistenciaClase> {

  // Verifica que el cliente esté con una membrecia en activo
  await validarMembreciaActiva(data.clienteId, data.horacheckin);

  const clase = await prisma.claseEspecifica.findUnique({
    where: { id: data.claseEspecificaId },
    include: {
      reservas: { where: { estado: 'Confirmada' }, select: { id: true, clienteId: true } },
      asistenciasClase: { select: { id: true, clienteId: true, reservaId: true } }
    }
  });
  if (!clase) {
    const error = new Error('Clase no encontrada');
    (error as any).statusCode = 404;
    throw error;
  }

  const reservasConfirmadas = clase.reservas.length;
  const asistenciasSinReserva = clase.asistenciasClase.filter(a => a.reservaId == null).length;
  const cupoOcupado = reservasConfirmadas + asistenciasSinReserva;

  // Verifico si el cliente tiene una reserva confirmada para esta clase
  const tieneReservaConfirmada = clase.reservas.some(r => r.clienteId === data.clienteId);

  if (!tieneReservaConfirmada && cupoOcupado >= clase.cantmax) {
    const error = new Error("No puede asistir: el cupo máximo fue alcanzado");
    (error as any).statusCode = 403;
    throw error;
   }


  // Validación extra: si se pasa reservaId, debe ser válida
  if (data.reservaId) {
    const reserva = await prisma.reserva.findUnique({
      where: { id: data.reservaId }
    });

    if (!reserva || reserva.estado !== 'Confirmada' || reserva.claseEspecificaId !== data.claseEspecificaId) {
      const error = new Error('La reserva indicada no es válida para esta clase');
      (error as any).statusCode = 400;
      throw error;
    }
  }

  const newAsistencia = await prisma.asistenciaClase.create({
    data: {
      horacheckin: data.horacheckin,
      clienteId: data.clienteId,
      claseEspecificaId: data.claseEspecificaId,
      reservaId: data.reservaId
    }
  });

  return newAsistencia;
}

export async function updateAsistenciaClase(id: number, data: UpdateAsistenciaClaseRequest): Promise<AsistenciaClase> {
    const updatedAsistencia = await prisma.asistenciaClase.update({
        where: { id },
        data: {
            ...(data.horacheckin != undefined ? { horacheckin: data.horacheckin } : {}),
            ...(data.claseEspecificaId != undefined ? { claseEspecificaId: data.claseEspecificaId } : {}),
            ...(data.clienteId != undefined ? { clienteId: data.clienteId } : {}),
            ...(data.reservaId != undefined ? { reservaId: data.reservaId } : {})
        }
    });
    return updatedAsistencia;
}

export async function deleteAsistenciaClase(id: number): Promise<AsistenciaClase> {
    const deletedAsistencia = await prisma.asistenciaClase.delete({ where: { id }});
    if (!deletedAsistencia) {
        const error = new Error('Asistencia no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedAsistencia;
}