import { Router } from 'express'
import * as usuarioController from '../controllers/usuario.controller'
import { createUserSchema, updateUserSchema } from '../validations/usuario.validations'
import { validate } from '../middlewares/validation.middleware'

const router = Router()

router.get('/', usuarioController.getAllUsuarios)

router.get('/:id', usuarioController.getUsuarioById)

router.post('/', validate(createUserSchema), usuarioController.createUsuario)

router.put('/:id', validate(updateUserSchema), usuarioController.updateUsuario)

router.delete('/:id', usuarioController.deleteUsuario)

export const usuarioRoutes = router