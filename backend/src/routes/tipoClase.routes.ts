import { Router } from "express";
import * as tipoClaseController from '../controllers/tipoClase.controller'
import { validate } from "../middlewares/validation.middleware";
import { createTipoClaseSchema, updateTipoClaseSchema } from "../validations/tipoClase.validations";

const router = Router();

router.get('/', tipoClaseController.getAllTiposClase)

router.get('/:id', tipoClaseController.getTipoClaseById)

router.post('/', validate(createTipoClaseSchema), tipoClaseController.createTipoClase)

router.put('/:id', validate(updateTipoClaseSchema), tipoClaseController.updateTipoClase)

router.delete('/:id', tipoClaseController.deleteTipoClase)

export const tipoClaseRoutes = router