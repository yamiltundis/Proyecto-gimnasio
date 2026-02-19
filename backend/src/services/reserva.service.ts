import { Reserva, CreateReservaRequest, UpdateReservaRequest } from "../types/reserva.types";
import prisma from "../config/prisma";
import { validarMembreciaActiva } from "./validarMembreciaActiva";
import redisClient from "../config/redis";

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
    const claseId = Number(data.claseEspecificaId);
    if (!claseId) throw new Error("Debe indicar una clase específica");

    const reservaKey = `clases:${claseId}:reservas`;
    const infoKey = `clases:${claseId}`;

    const [yaAnotado, cupoOcupado] = await Promise.all([
        redisClient.sIsMember(reservaKey, data.clienteId.toString()),
        redisClient.sCard(reservaKey)
    ]);

    if (yaAnotado) throw new Error("Ya te has anotado");

    await validarMembreciaActiva(data.clienteId, data.fechaReserva);

    const clase = await prisma.claseEspecifica.findUnique({
        where: { id: claseId },
        include: {
            _count: {
                select: {
                    reservas: { where: { estado: 'Confirmada' } }
                }
            }
        }
    });

    if (!clase) throw new Error('No existe esa clase');
    
    if (clase._count.reservas >= clase.cantmax) throw new Error('Cupo máximo alcanzado');
    if (new Date(data.fechaReserva) >= new Date(clase.diaHora)) throw new Error('La clase ya finalizó');

    const newReserva = await prisma.reserva.create({
        data: {
            fechaReserva: data.fechaReserva,
            estado: 'Confirmada',
            clienteId: data.clienteId,
            claseEspecificaId: claseId
        }
    });

    await redisClient.sAdd(reservaKey, data.clienteId.toString());
    
    console.log(`[Redis] Usuario ${data.clienteId} añadido a la clase ${claseId}`);

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