import { Request, Response, NextFunction } from "express";
import { AsistenciaClase, CreateAsistenciaClaseRequest, UpdateAsistenciaClaseRequest, AsistenciaClaseListResponse, AsistenciaClaseResponse } from "../types/asistenciaClase.types";
import * as asistenciaClaseService from '../services/asistenciaClase.service'

export async function getAllAsistenciasClases(req: Request, res: Response<AsistenciaClaseListResponse>, next: NextFunction) {
   try {
    const claseEspecificaId = req.query.claseEspecificaId
    ? Number(req.query.claseEspecificaId)
    : undefined;

    const asistencias = await asistenciaClaseService.getAllAsistenciasClases(claseEspecificaId);
    res.json({
        asistencias: asistencias,
        total: asistencias.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getAsistenciaClaseById(req: Request, res: Response<AsistenciaClaseResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const asistencia = await asistenciaClaseService.getAsistenciaClaseById(parseInt(id));
        res.json({
            asistencia: asistencia,
            message: 'Asistencia de clase retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createAsistenciaClase(req: Request<{}, AsistenciaClaseResponse, CreateAsistenciaClaseRequest>, res: Response<AsistenciaClaseResponse>, next: NextFunction) {
   try {
    const newAsistencia = await asistenciaClaseService.createAsistenciaClase(req.body);
    res.json({
       asistencia: newAsistencia,
       message: 'Asistencia de clase registrada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateAsistenciaClase(req: Request<{ id: string }, AsistenciaClaseResponse, UpdateAsistenciaClaseRequest>, res: Response<AsistenciaClaseResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedAsistencia = await asistenciaClaseService.updateAsistenciaClase(parseInt(id), req.body);
    res.json({
       asistencia: updatedAsistencia,
       message: 'Asistencia de clase actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteAsistenciaClase(req: Request, res: Response<AsistenciaClaseResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedAsistencia = await asistenciaClaseService.deleteAsistenciaClase(parseInt(id));
        res.json({
            asistencia: deletedAsistencia,
            message: 'Asistencia de clase eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}