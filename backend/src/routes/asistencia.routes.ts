import { Router } from "express";
import * as asistenciaController from '../controllers/asistencia.controller'

const router = Router();

router.get('/', asistenciaController.getAllAsistencias);

router.get('/:id', asistenciaController.getAsistenciaById);

router.post('/', asistenciaController.createAsistencia);

router.put('/:id', asistenciaController.updateAsistencia);

router.delete('/:id', asistenciaController.deleteAsistencia);

export const asistenciaRoutes = router;