import { Router } from "express";
import * as asistenciaClaseController from '../controllers/asistenciaClase.controller'
import { validate } from "../middlewares/validation.middleware";
import { createAsistenciaClaseSchema, updateAsistenciaClaseSchema } from "../validations/asistenciaClase.validations";
const router = Router();

router.get('/', asistenciaClaseController.getAllAsistenciasClases);

router.get('/:id', asistenciaClaseController.getAsistenciaClaseById);

router.post('/', validate(createAsistenciaClaseSchema), asistenciaClaseController.createAsistenciaClase);

router.put('/:id', validate(updateAsistenciaClaseSchema), asistenciaClaseController.updateAsistenciaClase);

router.delete('/:id', asistenciaClaseController.deleteAsistenciaClase);

export const asistenciaClaseRoutes = router;