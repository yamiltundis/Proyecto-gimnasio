import prisma from "../config/prisma";

export async function validarMembreciaActiva(clienteId: number, fechaComparacion: Date | string) {
  // 1. Aseguramos que la fecha de comparación sea un objeto Date
  const fechaReserva = new Date(fechaComparacion);

  const membreciaActiva = await prisma.membreciaActiva.findFirst({
    where: { 
      clienteId: clienteId,
      // Opcional: Podrías filtrar aquí directamente que la fecha de inicio sea menor a la reserva
      fechaInicio: { lte: fechaReserva }
    },
    orderBy: { fechaFin: 'desc' }
  });

  if (!membreciaActiva) {
    const error = new Error('El cliente no tiene ninguna membresía registrada');
    (error as any).statusCode = 400;
    throw error;
  }

  // 2. Convertimos el valor de la DB a Date (Prisma lo hace, pero por seguridad)
  const fechaFinMembresia = new Date(membreciaActiva.fechaFin);

  // LOG DE DEPURACIÓN: Esto te ayudará a ver qué está pasando en la consola
  console.log(`Comparando: Fin Membresía (${fechaFinMembresia.toISOString()}) < Fecha Reserva (${fechaReserva.toISOString()})`);

  if (fechaFinMembresia < fechaReserva) {
    const error = new Error('La membresía del cliente ha vencido para la fecha de la clase');
    (error as any).statusCode = 403;
    throw error;
  }

  return membreciaActiva;
}