import { ListaPrecio, CreateListaPrecio, UpdateListaPrecio } from "../types/listaPrecio.types";
import prisma from "../config/prisma";

export async function getAllListasPrecios(): Promise<ListaPrecio[]> {
    const listas = await prisma.listaPrecio.findMany({
        orderBy: { id: 'asc'}
    })
    return listas;
}

export async function getUltimoPrecioByMembrecia(membreciaId: number): Promise<Number> {
    const precio = await prisma.listaPrecio.findFirst({
        where: { tipoMembreciaId: membreciaId },
        orderBy: { diaInicial: 'desc'}
    })
    if (!precio) {
        const error = new Error('Sin precio');
        (error as any).statusCode = 404;
        throw(error);
    }
    return precio.monto
}

export async function getListaPrecioById(id: number): Promise<ListaPrecio> {
    const lista = await prisma.listaPrecio.findUnique({ where: { id }});
    if (!lista) {
        const error = new Error('Lista de precio no encontrada');
        (error as any).statusCode = 404;
        throw(error);
    }
    return lista
}

export async function createListaPrecio(data: CreateListaPrecio): Promise<ListaPrecio> {
    const newLista = await prisma.listaPrecio.create({
        data: {
            diaInicial: data.diaInicial,
            monto: data.monto,
            tipoMembreciaId: data.tipoMembreciaId
        }
    });
    return newLista;
}

export async function updateListaPrecio(id: number, data: UpdateListaPrecio): Promise<ListaPrecio> {
    const updatedLista = await prisma.listaPrecio.update({
        where: { id },
        data: {
            ...(data.diaInicial != undefined ? { diaInicial: data.diaInicial } : {}),
            ...(data.monto != undefined ? { monto: data.monto } : {}),
            ...(data.tipoMembreciaId != undefined ? { tipoMembreciaId: data.tipoMembreciaId } : {})
        }
    });
    return updatedLista;
}

export async function deleteListaPrecio(id: number): Promise<ListaPrecio> {
    const deletedLista = await prisma.listaPrecio.delete({ where: { id }});
    if (!deletedLista) {
        const error = new Error('Lista de precio no encontrada');
        (error as any).statusCode= 404;
        throw(error)
    }
    return deletedLista;
}