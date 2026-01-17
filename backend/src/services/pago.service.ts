import { Pago, CreatePagoRequest, UpdatePagoRequest } from "../types/pago.types";
import prisma from "../config/prisma";

export async function getAllPagos(): Promise<Pago[]> {
    const pagos = await prisma.pago.findMany({
        orderBy: { fecha: 'desc'},
        include: {
            cliente: {
              select: {
                nombre: true,
                apellido: true
              }
            },
            tipoMembrecia: {
              select: {
                nombre: true
              }
            }
        }
    })
    return pagos;
}

export async function getAllPagosByCliente(id: number): Promise<Pago[]> {
    const pagos = await prisma.pago.findMany({
        where: { clienteId: id },
        orderBy: { fecha: 'desc'},
        include: {
            tipoMembrecia: {
              select: {
                nombre: true
              }
            }
        }
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

    // Busco que el tipo de membrecia exista
    const membrecia = await prisma.tipoMembrecia.findUnique({
        where: { id: data.tipoMembreciaId}
    })

    if (!membrecia) {
      const error = new Error('Membrecia no encontrada');
      (error as any).statusCode = 404;
      throw(error);
    }

    // Busco que el tipo de membrecia tenga un precio en "ListaPrecio"
    const ultimoPrecio = await prisma.listaPrecio.findFirst({
      where: { tipoMembreciaId: data.tipoMembreciaId },
      orderBy: { diaInicial: 'desc' }
    });
    
    if (!ultimoPrecio) {
      const error = new Error('Monto no encontrado');
      (error as any).statusCode = 404;
      throw(error);
    }

    // Registro el pago
    const newPago = await prisma.pago.create({
        data: {
            fecha: data.fecha,
            monto: ultimoPrecio.monto,
            clienteId: data.clienteId,
            tipoMembreciaId: data.tipoMembreciaId
        }
    });


    // Regla de negocio para el tema de qué hacer cuando se crea una membreciaActiva
    const ultimaMembresia = await prisma.membreciaActiva.findFirst({
      where: { clienteId: data.clienteId },
      orderBy: { fechaFin: 'desc' }
    });

    let fechaInicio: Date;
    let fechaFin: Date;
    const fechaPago = data.fecha ? new Date(data.fecha) : new Date();

    if (ultimaMembresia && ultimaMembresia.fechaFin > fechaPago) {
      // Caso vigente: arranca la nueva membreciaActiva cuando termina la actual
      fechaInicio = ultimaMembresia.fechaFin;
      fechaFin = new Date(fechaInicio.getTime() + membrecia.dias * 24 * 60 * 60 * 1000);
    } else {
      // Caso vencida o en negativo
      fechaInicio = fechaPago;
    
      if (ultimaMembresia) {
        const diasNegativos = Math.floor(
          (fechaInicio.getTime() - ultimaMembresia.fechaFin.getTime()) / (24 * 60 * 60 * 1000)
        );
    
        // Si estuvo en negativo, se descuentan esos días
        const diasRestantes = membrecia.dias - Math.max(diasNegativos, 0);
        fechaFin = new Date(fechaInicio.getTime() + diasRestantes * 24 * 60 * 60 * 1000);
      } else {
        // Primera membresía del cliente
        fechaFin = new Date(fechaInicio.getTime() + membrecia.dias * 24 * 60 * 60 * 1000);
      }
    }


    // Se crea la membreciaActiva
    await prisma.membreciaActiva.create({
      data: {
        clienteId: data.clienteId,
        pagoId: newPago.id,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
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