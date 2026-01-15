import { Request, Response, NextFunction } from "express";
import { Asistencia, CreateAsistenciaRequest, UpdateAsistenciaRequest, AsistenciaListResponse, AsistenciaResponse } from "../types/asistencia.types";
import * as asistenciaService from '../services/asistencia.service'

export async function getAllAsistencias(req: Request, res: Response<AsistenciaListResponse>, next: NextFunction) {
   try {
    const asistencias = await asistenciaService.getAllAsistencias();
    res.json({
        asistencias: asistencias,
        total: asistencias.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getAllAsistenciasByCliente(req: Request, res: Response<AsistenciaListResponse>, next: NextFunction) {
    console.log("Usuario en request:", req.usuario);

   try {
    const id = req.usuario!.id;
    const asistencias = await asistenciaService.getAllAsistenciasByCliente(id);
    res.json({
        asistencias: asistencias,
        total: asistencias.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getAsistenciaById(req: Request, res: Response<AsistenciaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const asistencia = await asistenciaService.getAsistenciaById(parseInt(id));
        res.json({
            asistencia: asistencia,
            message: 'Asistencia retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createAsistencia(req: Request<{}, AsistenciaResponse, CreateAsistenciaRequest>, res: Response<AsistenciaResponse>, next: NextFunction) {
   try {
    const newAsistencia = await asistenciaService.createAsistencia(req.body);
    res.json({
       asistencia: newAsistencia,
       message: 'Asistencia registrada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateAsistencia(req: Request<{ id: string }, AsistenciaResponse, UpdateAsistenciaRequest>, res: Response<AsistenciaResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedAsistencia = await asistenciaService.updateAsistencia(parseInt(id), req.body);
    res.json({
       asistencia: updatedAsistencia,
       message: 'Asistencia actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteAsistencia(req: Request, res: Response<AsistenciaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedAsistencia = await asistenciaService.deleteAsistencia(parseInt(id));
        res.json({
            asistencia: deletedAsistencia,
            message: 'Asistencia eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}