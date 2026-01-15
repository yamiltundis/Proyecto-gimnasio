import { Router } from 'express'
import * as usuarioController from '../controllers/usuario.controller'
import { createUserSchema, updateUserSchema } from '../validations/usuario.validations'
import { validate } from '../middlewares/validation.middleware'
import { authenticate, authorize } from '../middlewares/auth.middleware'

const router = Router();

router.get('/', authenticate, authorize('superadmin','admin'), usuarioController.getAllUsuarios)

router.get('/:id', authenticate, authorize('superadmin', 'admin', 'cliente'), usuarioController.getUsuarioById)

router.post('/', authenticate, authorize('superadmin', 'admin'), validate(createUserSchema), usuarioController.createUsuario)

router.put('/:id', authenticate, authorize('superadmin', 'admin', 'cliente'), validate(updateUserSchema), usuarioController.updateUsuario)

router.delete('/:id', authenticate, authorize('superadmin'), usuarioController.deleteUsuario)

export const usuarioRoutes = router