import { ClaseEspecifica, ClaseEspecificaListadoFront ,CreateClaseEspecifica, CreateClaseEspecificaConPatron, UpdateClaseEspecifica } from "../types/claseEspecifica.types";
import prisma from "../config/prisma";
import { addDays, isBefore } from "date-fns";

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

export async function createClaseEspecificaConPatron(data: CreateClaseEspecificaConPatron): Promise<ClaseEspecifica[]> {
  const fechaInicio = new Date(data.fechaInicio);
  const fechaFin = new Date(data.fechaFin);

  const clasesCreadas: ClaseEspecifica[] = [];

  for (let d = new Date(fechaInicio); d <= fechaFin; d = addDays(d, 1)) {
    const nombreDia = d
      .toLocaleDateString("es-ES", { weekday: "long" })
      .toLowerCase();

    if (data.diasSemana.includes(nombreDia)) {
      const [horaStr, minutoStr] = data.hora.split(":");
      const fechaClase = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        parseInt(horaStr, 10),
        parseInt(minutoStr, 10),
        0,
        0
      );

      console.log("FechaClase construida:", fechaClase.toISOString());

      const nuevaClase = await createClaseEspecifica({
        diaHora: fechaClase,
        cantmax: data.cantmax,
        tipoClaseId: data.tipoClaseId,
      });

      clasesCreadas.push(nuevaClase);
    }
  }

  return clasesCreadas;
  
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