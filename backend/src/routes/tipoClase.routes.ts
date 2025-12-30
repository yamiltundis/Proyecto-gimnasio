import { Router } from "express";
import * as tipoClaseController from '../controllers/tipoClase.controller'

const router = Router();

router.get('/', tipoClaseController.getAllTiposClase)

router.get('/:id', tipoClaseController.getTipoClaseById)

router.post('/', tipoClaseController.createTipoClase)

router.put('/:id', tipoClaseController.updateTipoClase)

router.delete('/:id', tipoClaseController.deleteTipoClase)

export const tipoClaseRoutes = router