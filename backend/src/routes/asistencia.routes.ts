import { Router } from "express";
import * as asistenciaController from '../controllers/asistencia.controller'
import { validate } from "../middlewares/validation.middleware";
import { createAsistenciaSchema, updateAsistenciaSchema } from "../validations/asistencia.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get('/admin', authenticate, authorize("admin"), asistenciaController.getAllAsistencias);

router.get('/cliente', authenticate, authorize("cliente"),asistenciaController.getAllAsistenciasByCliente);

router.get('/:id', authenticate, authorize("admin"), asistenciaController.getAsistenciaById);

router.post('/', authenticate, authorize("admin"), validate(createAsistenciaSchema), asistenciaController.createAsistencia);

router.put('/:id', authenticate, authorize("admin"), validate(updateAsistenciaSchema), asistenciaController.updateAsistencia);

router.delete('/:id', authenticate, authorize("admin"), asistenciaController.deleteAsistencia);

export const asistenciaRoutes = router;