import { Request, Response, NextFunction } from "express";
import { ClaseEspecifica, CreateClaseEspecifica, UpdateClaseEspecifica, ClaseEspecificaListResponse, ClaseEspecificaResponse } from "../types/claseEspecifica.types";
import * as claseEspecificaService from '../services/claseEspecifica.service'

export async function getAllClasesEspecificas(req: Request, res: Response<ClaseEspecificaListResponse>, next: NextFunction) {
   try {
    const clases = await claseEspecificaService.getAllClasesEspecificas();
    res.json({
        clasesEspecificas: clases,
        total: clases.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getClaseEspecificaById(req: Request, res: Response<ClaseEspecificaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const clase = await claseEspecificaService.getClaseEspecificaById(parseInt(id));
        res.json({
            claseEspecifica: clase,
            message: 'Clase especifica retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createClaseEspecifica(req: Request<{}, ClaseEspecificaResponse, CreateClaseEspecifica>, res: Response<ClaseEspecificaResponse>, next: NextFunction) {
   try {
    const newClase = await claseEspecificaService.createClaseEspecifica(req.body);
    res.json({
       claseEspecifica: newClase,
       message: 'Clase Especifica creada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateClaseEspecifica(req: Request<{ id: string }, ClaseEspecificaResponse, UpdateClaseEspecifica>, res: Response<ClaseEspecificaResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedClase = await claseEspecificaService.updateClaseEspecifica(parseInt(id), req.body);
    res.json({
       claseEspecifica: updatedClase,
       message: 'Clase Especifica actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteClaseEspecifica(req: Request, res: Response<ClaseEspecificaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedClase = await claseEspecificaService.deleteClaseEspecifica(parseInt(id));
        res.json({
            claseEspecifica: deletedClase,
            message: 'Clase especifica eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}