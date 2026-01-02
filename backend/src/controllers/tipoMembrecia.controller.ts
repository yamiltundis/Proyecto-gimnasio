import { Request, Response, NextFunction } from "express";
import { TipoMembrecia, CreateTipoMembrecia, UpdateTipoMembrecia, TipoMembreciaListResponse, TipoMembreciaResponse} from "../types/tipoMembrecia.types";
import * as tipoMembreciaService from '../services/tipoMembrecia.service'

export async function getAllTiposMembrecias(req: Request, res: Response<TipoMembreciaListResponse>, next: NextFunction) {
   try {
    const tipos = await tipoMembreciaService.getAllTiposMembrecias();
    res.json({
        tiposmembrecias: tipos,
        total: tipos.length
    })
   } catch (error) {
        next(error)
   }
}

export async function getTipoMembreciaById(req: Request, res: Response<TipoMembreciaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const tipo = await tipoMembreciaService.getTipoMembreciaById(parseInt(id));
        res.json({
            tipomembrecia: tipo,
            message: 'Tipo de membrecia retornada correctamente'
        })
    } catch (error) {
        next(error)
    }
}

export async function createTipoMembrecia(req: Request<{}, TipoMembreciaResponse, CreateTipoMembrecia>, res: Response<TipoMembreciaResponse>, next: NextFunction) {
   try {
    const newTipo = await tipoMembreciaService.createTipoMembrecia(req.body);
    res.json({
       tipomembrecia: newTipo,
       message: 'Tipo de membrecia creada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function updateTipoMembrecia(req: Request<{ id: string }, TipoMembreciaResponse, UpdateTipoMembrecia>, res: Response<TipoMembreciaResponse>, next: NextFunction) {
   try {
    const { id } = req.params
    const updatedTipo = await tipoMembreciaService.updateTipoMembrecia(parseInt(id), req.body);
    res.json({
       tipomembrecia: updatedTipo,
       message: 'Tipo de membrecia actualizada correctamente'
    })
   } catch (error) {
        next(error)
   }
}

export async function deleteTipoMembrecia(req: Request, res: Response<TipoMembreciaResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedTipo = await tipoMembreciaService.deleteTipoMembrecia(parseInt(id));
        res.json({
            tipomembrecia: deletedTipo,
            message: 'Tipo de membrecia eliminada correctamente'
        })
    } catch (error) {
        next(error)
    }
}