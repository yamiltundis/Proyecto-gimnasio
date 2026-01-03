import prisma from "../config/prisma";

export async function validarMembreciaActiva(clienteId: number, fechaComparacion: Date) {
    const membreciaActiva = await prisma.membreciaActiva.findFirst({
    where: { clienteId: clienteId },
    orderBy: { fechaFin: 'desc' }
  });

  if (!membreciaActiva) {
    const error = new Error('El cliente no tiene ninguna membrecía activa');
    (error as any).statusCode = 400;
    throw error;
  }
  if (membreciaActiva.fechaFin < fechaComparacion) {
    const error = new Error('La membrecia del cliente ha vencido');
    (error as any).statusCode = 403;
    throw error;
  }
  return membreciaActiva
}