import { Reserva, CreateReservaRequest, UpdateReservaRequest } from "../types/reserva.types";
import prisma from "../config/prisma";
import { validarMembreciaActiva } from "./validarMembreciaActiva";

export async function getAllReservas(claseEspecificaId?: number): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
        where: claseEspecificaId ? { claseEspecificaId: claseEspecificaId } : {},
        orderBy: { id: 'asc'},
        include: { 
            cliente: {
                select: {
                    nombre: true,
                    apellido: true
                }
            }
        }
    })
    return reservas;
}

export async function getReservaById(id: number): Promise<Reserva> {
    const reserva = await prisma.reserva.findUnique({ where: { id }});
    if (!reserva) {
        const error = new Error('Reserva no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return reserva
}

export async function createReserva(data: CreateReservaRequest): Promise<Reserva> {

    // Verifica que el cliente esté con una membrecia en activo
    await validarMembreciaActiva(data.clienteId, data.fechaReserva);

    // Verifico que exista la clase específica y que el cupo máximo no haya sido alcanzado
    if (!data.claseEspecificaId) { throw new Error("Debe indicar una clase específica"); }
    const claseId = Number(data.claseEspecificaId);

    const clase = await prisma.claseEspecifica.findUnique({
    where: { id: claseId },
    include: {
      reservas: {
        where: { estado: 'Confirmada' },
        select: { id: true }
      }
     }
    });

    if (!clase) throw new Error('No existe esa clase');
    if (clase.reservas.length >= clase.cantmax) throw new Error('Cupo máximo alcanzado');
    if (data.fechaReserva >= clase.diaHora) throw new Error('La clase ya finalizó');

    // Creo la reserva
    const newReserva = await prisma.reserva.create({
        data: {
            fechaReserva: data.fechaReserva,
            estado: 'Confirmada',
            clienteId: data.clienteId,
            claseEspecificaId: data.claseEspecificaId
        }
    });
    return newReserva;
}

export async function updateReserva(id: number, data: UpdateReservaRequest): Promise<Reserva> {
    const updatedReserva = await prisma.reserva.update({
        where: { id },
        data: {
            ...(data.fechaReserva != undefined ? { fechaReserva: data.fechaReserva } : {}),
            ...(data.claseEspecificaId != undefined ? { claseEspecificaId: data.claseEspecificaId } : {}),
            ...(data.clienteId != undefined ? { clienteId: data.clienteId } : {}),
            ...(data.estado != undefined ? { estado: data.estado } : {})
        }
    });
    return updatedReserva;
}

export async function deleteReserva(id: number): Promise<Reserva> {
    const deletedReserva = await prisma.reserva.delete({ where: { id }});
    if (!deletedReserva) {
        const error = new Error('Reserva no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedReserva;
}