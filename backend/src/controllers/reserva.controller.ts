import { Request, Response, NextFunction } from "express";
import { Reserva, CreateReservaRequest, UpdateReservaRequest, ReservaListResponse, ReservaResponse } from "../types/reserva.types";
import * as reservaService from '../services/reserva.service'

export async function getAllReservas(req: Request, res: Response<ReservaListResponse>, next: NextFunction) {
   try {
    const claseEspecificaId = req.query.claseEspecificaId
    ? Number(req.query.claseEspecificaId)
    : undefined;

    const reservas = await reservaService.getAllReservas(claseEspecificaId);
    res.json({
        reservas: reservas,
        total: reservas.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getReservaById(req: Request, res: Response<ReservaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const reserva = await reservaService.getReservaById(parseInt(id));
        res.json({
            reserva: reserva,
            message: 'Reserva retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createReserva(req: Request<{}, ReservaResponse, CreateReservaRequest>, res: Response<ReservaResponse>, next: NextFunction) {
   try {
    const newReserva = await reservaService.createReserva(req.body);
    res.json({
       reserva: newReserva,
       message: 'Reserva registrada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateReserva(req: Request<{ id: string }, ReservaResponse, UpdateReservaRequest>, res: Response<ReservaResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedReserva = await reservaService.updateReserva(parseInt(id), req.body);
    res.json({
       reserva: updatedReserva,
       message: 'Reserva actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteReserva(req: Request, res: Response<ReservaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedReserva = await reservaService.deleteReserva(parseInt(id));
        res.json({
            reserva: deletedReserva,
            message: 'Reserva eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}