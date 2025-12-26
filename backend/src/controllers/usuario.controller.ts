import { Request, Response, NextFunction } from "express";
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioResponse, UsuarioListResponse } from "../types/usuario.types";
import * as usuarioService from '../services/usuario.service'

export async function getAllUsuarios (req: Request, res: Response<UsuarioListResponse>, next: NextFunction) {
    try {
      const usuarios = await usuarioService.getAllUsuarios();
      res.json({
        usuarios,
        total: usuarios.length
      })
    } catch (error) {
        next(error)
    }
}

export async function getUsuarioById (req: Request, res: Response<UsuarioResponse>, next: NextFunction) {
    try {
       const { id } = req.params
       const usuario = await usuarioService.getUsuarioById(parseInt(id))
       res.json({
         usuario,
         message:'Usuario retornado correctamente'
       }) 
    } catch (error) {
        next(error)
    }
}

export async function createUsuario (req: Request<{}, UsuarioResponse, CreateUsuarioRequest>, res: Response<UsuarioResponse>, next: NextFunction) {
    try {
       const newUsuario = await usuarioService.createUsuario(req.body)
       res.status(201).json({
          usuario: newUsuario,
          message: 'Usuario creado correctamente'
       })
    } catch (error) {
        next(error)
    }
}

export async function updateUsuario(req: Request<{ id: string }, UsuarioResponse, UpdateUsuarioRequest>, res: Response<UsuarioResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const updatedUsuario = await usuarioService.updateUsuario(parseInt(id), req.body)
        res.json({
            usuario: updatedUsuario,
            message: 'Usuario actualizado correctamente'
        })
    } catch (error) {
        next(error)
    }  
}

export async function deleteUsuario (req:Request, res: Response<UsuarioResponse>, next: NextFunction) {
    try {
        const { id } = req.params;
        const deletedUsuario = await usuarioService.deleteUsuario(parseInt(id))
        res.json({
            usuario: deletedUsuario,
            message: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        next(error)
    }
}