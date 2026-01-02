import { Pago, CreatePagoRequest, UpdatePagoRequest } from "../types/pago.types";
import prisma from "../config/prisma";

export async function getAllPagos(): Promise<Pago[]> {
    const pagos = await prisma.pago.findMany({
        orderBy: { id: 'asc'}
    })
    return pagos;
}

export async function getPagoById(id: number): Promise<Pago> {
    const pago = await prisma.pago.findUnique({ where: { id }});
    if (!pago) {
        const error = new Error('Pago no encontrado');
        (error as any).statusCode = 404;
        throw(error);
    }
    return pago
}

export async function createPago(data: CreatePagoRequest): Promise<Pago> {

    const membrecia = await prisma.tipoMembrecia.findUnique({
        where: { id: data.tipoMembreciaId}
    })

    if (!membrecia) {
      const error = new Error('Membrecia no encontrada');
      (error as any).statusCode = 404;
      throw(error);
    }

    const ultimoPrecio = await prisma.listaPrecio.findFirst({
      where: { tipoMembreciaId: data.tipoMembreciaId },
      orderBy: { diaInicial: 'desc' }
    });
    
    if (!ultimoPrecio) {
      const error = new Error('Monto no encontrado');
      (error as any).statusCode = 404;
      throw(error);
    }

    const newPago = await prisma.pago.create({
        data: {
            fecha: data.fecha,
            monto: ultimoPrecio.monto,
            clienteId: data.clienteId,
            tipoMembreciaId: data.tipoMembreciaId
        }
    });
    return newPago;
}

export async function updatePago(id: number, data: UpdatePagoRequest): Promise<Pago> {
    const updatedPago = await prisma.pago.update({
        where: { id },
        data: {
            ...(data.fecha != undefined ? { fecha: data.fecha } : {}),
            ...(data.tipoMembreciaId != undefined ? { tipoMembreciaId: data.tipoMembreciaId } : {}),
            ...(data.clienteId != undefined ? { clienteId: data.clienteId } : {})
        }
    });
    return updatedPago;
}

export async function deletePago(id: number): Promise<Pago> {
    const deletedPago = await prisma.pago.delete({ where: { id }});
    if (!deletedPago) {
        const error = new Error('Pago no encontrado');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedPago;
}