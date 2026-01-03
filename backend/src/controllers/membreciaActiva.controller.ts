import { Request, Response, NextFunction } from "express";
import * as membreciaActivaService from '../services/membreciaActiva.service'

export async function getUltimaMembreciaActiva(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const diasRestantes = await membreciaActivaService.getUltimaMembreciaActiva(parseInt(id));
        res.json({
            diasRestantes: diasRestantes
        })
    } catch (error) {
        next(error)
    }
}