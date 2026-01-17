import { Request, Response, NextFunction } from "express";
import { Pago, CreatePagoRequest, UpdatePagoRequest, PagoListResponse, PagoResponse} from "../types/pago.types";
import * as pagoService from '../services/pago.service'

export async function getAllPagos(req: Request, res: Response<PagoListResponse>, next: NextFunction) {
   try {
    const pagos = await pagoService.getAllPagos();
    res.json({
        pagos: pagos,
        total: pagos.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getAllPagosByCliente(req: Request, res: Response<PagoListResponse>, next: NextFunction) {
   try {
    const id = req.usuario!.id;
    const pagos = await pagoService.getAllPagosByCliente(id);
    res.json({
        pagos: pagos,
        total: pagos.length
    })
   } catch (error) {
        next(error)
   }
}


export async function getPagoById(req: Request, res: Response<PagoResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const pago = await pagoService.getPagoById(parseInt(id));
        res.json({
            pago: pago,
            message: 'Pago retornado correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createPago(req: Request<{}, PagoResponse, CreatePagoRequest>, res: Response<PagoResponse>, next: NextFunction) {
   try {
    const newPago = await pagoService.createPago(req.body);
    res.json({
       pago: newPago,
       message: 'Pago registrado correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updatePago(req: Request<{ id: string }, PagoResponse, UpdatePagoRequest>, res: Response<PagoResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedPago = await pagoService.updatePago(parseInt(id), req.body);
    res.json({
       pago: updatedPago,
       message: 'Pago actualizado correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deletePago(req: Request, res: Response<PagoResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedPago = await pagoService.deletePago(parseInt(id));
        res.json({
            pago: deletedPago,
            message: 'Pago eliminado correctamente'
        })
    } catch (error) {
        next(error)
    }
}