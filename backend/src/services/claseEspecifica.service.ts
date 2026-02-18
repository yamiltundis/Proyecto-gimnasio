import { ClaseEspecifica, ClaseEspecificaListadoFront ,CreateClaseEspecifica, CreateClaseEspecificaConPatron, UpdateClaseEspecifica } from "../types/claseEspecifica.types";
import prisma from "../config/prisma";
import { addDays, isBefore } from "date-fns";
import redisClient from "../config/redis";

export async function getAllClasesEspecificas(tipoClase?: number): Promise<ClaseEspecificaListadoFront[]> {
    const clases = await prisma.claseEspecifica.findMany({
        where: tipoClase ? { tipoClaseId: tipoClase } : {},
        include: { reservas: true, asistenciasClase: true, tipoClase: true },
        orderBy: { diaHora: 'asc' }
    })

    const clasesConEstado: ClaseEspecificaListadoFront[]= clases.map(clase => ({
        id: clase.id,
        diaHora: clase.diaHora,
        cantmax: clase.cantmax,
        tipoClaseId: clase.tipoClaseId,
        nombre: clase.tipoClase.nombre,
        estado: new Date(clase.diaHora) > new Date() ? "Pendiente" : "Finalizada",
        cantidadReservas: clase.reservas.length,
        cantidadAsistencias: clase.asistenciasClase.length
    }));

    clasesConEstado.sort((a, b) => {
       if (a.estado === "Pendiente" && b.estado === "Finalizada") return -1;
       if (a.estado === "Finalizada" && b.estado === "Pendiente") return 1;

       // Si ambos son pendientes → orden ascendente por fecha
       if (a.estado === "Pendiente" && b.estado === "Pendiente") {
         return a.diaHora.getTime() - b.diaHora.getTime();
       }

       // Si ambos son finalizadas → orden descendente por fecha (más reciente primero)
       return b.diaHora.getTime() - a.diaHora.getTime();
    });


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

export async function getClasesEspecificasParaAnotarse(userId: number): Promise<ClaseEspecificaListadoFront[]> {
    const cacheKey = `clases:anotarse:user:${userId}`;

    try {
        // 1. Intentar obtener de Redis
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`[Redis] Cache hit para usuario ${userId}`);
            return JSON.parse(cachedData);
        }
    } catch (error) {
        console.error("Error leyendo de Redis:", error);
        // Si Redis falla, no cortamos la ejecución, seguimos a la DB (fallback)
    }

    // --- Lógica original de Prisma ---
    console.log(`[DB] Consultando base de datos para usuario ${userId}`);
    const ahora = new Date();
    const limite = addDays(ahora, 5);

    const clases = await prisma.claseEspecifica.findMany({ 
        where: { 
            diaHora: {
              gte: ahora,
              lte: limite
            }
        },
        include: {
            reservas: true,
            asistenciasClase: true,
            tipoClase: true
        },
        orderBy: {
            diaHora: "asc",
        },
    });

    if (!clases) {
        const error = new Error('Clase específicas no encontradas');
        (error as any).statusCode = 404;
        throw(error);
    }

    const clasesConInfo: ClaseEspecificaListadoFront[] = clases.map(clase => ({
        id: clase.id,
        diaHora: clase.diaHora,
        cantmax: clase.cantmax,
        tipoClaseId: clase.tipoClaseId,
        nombre: clase.tipoClase.nombre,
        estado: new Date(clase.diaHora) > new Date() ? "Pendiente" : "Finalizada",
        cantidadReservas: clase.reservas.length,
        cantidadAsistencias: clase.asistenciasClase.length,
        yaReservado: clase.reservas.some(r => r.clienteId == userId)
    }));

    try {
        // Guarda en Redis antes de retornar
        await redisClient.set(cacheKey, JSON.stringify(clasesConInfo), {
            EX: 300
        });
    } catch (error) {
        console.error("Error guardando en Redis:", error);
    }

    return clasesConInfo;
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