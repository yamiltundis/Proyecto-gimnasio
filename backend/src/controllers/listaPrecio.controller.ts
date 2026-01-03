import { Request, Response, NextFunction } from "express";
import { ListaPrecio, CreateListaPrecio, UpdateListaPrecio, ListaPrecioListResponse, ListaPrecioResponse} from "../types/listaPrecio.types";
import * as listaPrecioService from '../services/listaPrecio.service'
import { nextTick } from "node:process";

export async function getAllListasPrecios(req: Request, res: Response<ListaPrecioListResponse>, next: NextFunction) {
   try {
    const listas = await listaPrecioService.getAllListasPrecios();
    res.json({
        listasprecios: listas,
        total: listas.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getUltimoPrecioByMembrecia(req: Request, res: Response, next: NextFunction) {
    try {
        const { membreciaId } = req.params;
        const precio = await listaPrecioService.getUltimoPrecioByMembrecia(parseInt(membreciaId))
        res.json({
            monto: precio
        })
    } catch (error) {
        next(error)
    }
}

export async function getListaPrecioById(req: Request, res: Response<ListaPrecioResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const lista = await listaPrecioService.getListaPrecioById(parseInt(id));
        res.json({
            listaprecio: lista,
            message: 'Lista de precio retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createListaPrecio(req: Request<{}, ListaPrecioResponse, CreateListaPrecio>, res: Response<ListaPrecioResponse>, next: NextFunction) {
   try {
    const newLista = await listaPrecioService.createListaPrecio(req.body);
    res.json({
       listaprecio: newLista,
       message: 'Lista de precio creada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateListaPrecio(req: Request<{ id: string }, ListaPrecioResponse, UpdateListaPrecio>, res: Response<ListaPrecioResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedLista = await listaPrecioService.updateListaPrecio(parseInt(id), req.body);
    res.json({
       listaprecio: updatedLista,
       message: 'Lista de precio actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteListaPrecio(req: Request, res: Response<ListaPrecioResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedLista = await listaPrecioService.deleteListaPrecio(parseInt(id));
        res.json({
            listaprecio: deletedLista,
            message: 'Lista de precio eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}