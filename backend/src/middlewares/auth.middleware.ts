import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                rol: 'cliente' | 'admin' | 'superadmin'
            }
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Token no proporcionado'});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        req.user = {
            id: decoded.id,
            email: decoded.email,
            rol: decoded.rol
        };
        next();
    } catch (error: any) {
        console.error(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token expirado' });
        }
        res.status(401).json({ success: false, error: 'Token inválido '})
    }
}

export function authorize(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.json(401).json({
                success: false,
                error: 'No autenticado'
            })
        }
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({
                success: false,
                error: 'No tienes permisos para esta acción'
            });
        }
        next();
    }
}