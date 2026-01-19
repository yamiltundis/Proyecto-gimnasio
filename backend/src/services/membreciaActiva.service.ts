import prisma from "../config/prisma";

export async function getUltimaMembreciaActiva(clienteId: number) {

    const ultimaMembresia = await prisma.membreciaActiva.findFirst({
      where: { clienteId },
      orderBy: { fechaFin: 'desc' }
    })

    if (!ultimaMembresia) { throw new Error('Sin membrecias activas')}

    const fechaActual = new Date()
    const diasRestantes = Math.floor((ultimaMembresia.fechaFin.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24));

    let estado : string;
    if (diasRestantes >= 0) {
      estado = 'Activo'
    } else if (diasRestantes < 0 && diasRestantes >= -7) {
      estado = 'Atrasado'
    } else {
      estado = 'Suspendido'
    }

    const respuesta = ({
      fechaFin: ultimaMembresia.fechaFin,
      diasRestantes,
      estado
    })
    return respuesta

}