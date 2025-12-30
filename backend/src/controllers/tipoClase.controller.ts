import { Request, Response, NextFunction } from "express";
import * as tipoClaseService from '../services/tipoClase.service'
import { TipoClase, CreateTipoClaseRequest, UpdateTipoClaseRequest, TipoClaseResponse, TipoClaseListResponse } from "../types/tipoClase.types";

export async function getAllTiposClase(req: Request, res: Response<TipoClaseListResponse>, next: NextFunction) {
    try {
        const tiposClase = await tipoClaseService.getAllTiposClase();
        res.json({
            tiposClase,
            total: tiposClase.length
        })
    } catch (error) {
        next(error)
    }
}

export async function getTipoClaseById(req: Request, res: Response<TipoClaseResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const tipoClase = await tipoClaseService.getTipoClaseById(parseInt(id));
        res.json({
            tipoClase,
            message: 'Tipo de clase retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createTipoClase(req: Request<{}, TipoClaseResponse, CreateTipoClaseRequest>, res: Response<TipoClaseResponse>, next: NextFunction) {
    try {
        const newTipoClase = await tipoClaseService.createTipoClase(req.body)
        res.status(201).json({
            tipoClase: newTipoClase,
            message: 'Tipo de clase creada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function updateTipoClase(req: Request<{ id: string }, TipoClaseResponse, UpdateTipoClaseRequest>, res: Response<TipoClaseResponse>, next: NextFunction) {
    try {
        const { id } = req.params
        const updatedTipoClase = await tipoClaseService.updateTipoClase(parseInt(id), req.body);
        res.json({
            tipoClase: updatedTipoClase,
            message: 'Tipo de clase actualizada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function deleteTipoClase (req:Request, res: Response<TipoClaseResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedTipoClase = await tipoClaseService.deleteTipoClase(parseInt(id))
        res.json({
            tipoClase: deletedTipoClase,
            message: 'Tipo de clase eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}