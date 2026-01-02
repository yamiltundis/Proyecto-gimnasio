import { Router } from "express";
import * as asistenciaClaseController from '../controllers/asistenciaClase.controller'

const router = Router();

router.get('/', asistenciaClaseController.getAllAsistenciasClases);

router.get('/:id', asistenciaClaseController.getAsistenciaClaseById);

router.post('/', asistenciaClaseController.createAsistenciaClase);

router.put('/:id', asistenciaClaseController.updateAsistenciaClase);

router.delete('/:id', asistenciaClaseController.deleteAsistenciaClase);

export const asistenciaClaseRoutes = router;