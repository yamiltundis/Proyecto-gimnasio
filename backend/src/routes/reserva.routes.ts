import { Router } from "express";
import * as reservaController from '../controllers/reserva.controller'
import { validate } from "../middlewares/validation.middleware";
import { createAsistenciaClaseSchema, updateAsistenciaClaseSchema } from "../validations/asistenciaClase.validations";

const router = Router();

router.get('/', reservaController.getAllReservas);

router.get('/:id', reservaController.getReservaById);

router.post('/', validate(createAsistenciaClaseSchema), reservaController.createReserva);

router.put('/:id', validate(updateAsistenciaClaseSchema),reservaController.updateReserva);

router.delete('/:id', reservaController.deleteReserva);

export const reservaRoutes = router;