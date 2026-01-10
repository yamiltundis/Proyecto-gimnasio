import { Router } from "express";
import * as asistenciaController from '../controllers/asistencia.controller'
import { validate } from "../middlewares/validation.middleware";
import { createAsistenciaSchema, updateAsistenciaSchema } from "../validations/asistencia.validations";

const router = Router();

router.get('/', asistenciaController.getAllAsistencias);

router.get('/:id', asistenciaController.getAsistenciaById);

router.post('/', validate(createAsistenciaSchema), asistenciaController.createAsistencia);

router.put('/:id', validate(updateAsistenciaSchema), asistenciaController.updateAsistencia);

router.delete('/:id', asistenciaController.deleteAsistencia);

export const asistenciaRoutes = router;