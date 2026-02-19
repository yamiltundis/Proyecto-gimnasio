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
        cantidadAsistencias: clase.asistenciasClase.length,
        yaReservado: true
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
    const ahora = new Date();
    const limite = addDays(ahora, 5);

    let idsClases = await redisClient.sMembers("clases:activas:ids");

    if (idsClases.length === 0) {
        const clasesDB = await prisma.claseEspecifica.findMany({
            where: { diaHora: { gte: ahora, lte: limite } },
            select: { id: true }
        });
        idsClases = clasesDB.map(c => c.id.toString());
        if (idsClases.length > 0) await redisClient.sAdd("clases:activas:ids", idsClases);
    }

    const promesas = idsClases.map(async (id) => {
        const infoKey = `clases:${id}`;
        const reservaKey = `clases:${id}:reservas`;

        let info = await redisClient.hGetAll(infoKey);

        if (Object.keys(info).length === 0) {
            const claseDB = await prisma.claseEspecifica.findUnique({
                where: { id: parseInt(id) },
                include: { tipoClase: true, reservas: { select: { clienteId: true } } }
            });

            if (!claseDB) return null;

            await redisClient.hSet(infoKey, {
                id: claseDB.id.toString(),
                nombre: claseDB.tipoClase.nombre,
                diaHora: claseDB.diaHora.toISOString(),
                cantmax: claseDB.cantmax.toString()
            });

            const idsReservas = claseDB.reservas.map(r => r.clienteId.toString());
            if (idsReservas.length > 0) {
                await redisClient.sAdd(reservaKey, idsReservas);
            }

            await redisClient.expire(infoKey, 86400);
            await redisClient.expire(reservaKey, 86400);

            info = {
                id: claseDB.id.toString(),
                nombre: claseDB.tipoClase.nombre,
                diaHora: claseDB.diaHora.toISOString(),
                cantmax: claseDB.cantmax.toString()
            };
        }

        const [cantidad, yaReservado] = await Promise.all([
            redisClient.sCard(reservaKey),
            redisClient.sIsMember(reservaKey, userId.toString())
        ]);

        return {
            id: parseInt(info.id),
            nombre: info.nombre,
            diaHora: new Date(info.diaHora),
            cantmax: parseInt(info.cantmax),
            cantidadReservas: cantidad,
            yaReservado: !!yaReservado, 
            estado: new Date(info.diaHora) > ahora ? "Pendiente" : "Finalizada",
            cantidadAsistencias: 0
        };
    });

    const resultado = await Promise.all(promesas);

    return resultado.filter((clase): clase is ClaseEspecificaListadoFront => clase !== null);
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