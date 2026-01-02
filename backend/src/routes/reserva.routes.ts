import { Router } from "express";
import * as reservaController from '../controllers/reserva.controller'

const router = Router();

router.get('/', reservaController.getAllReservas);

router.get('/:id', reservaController.getReservaById);

router.post('/', reservaController.createReserva);

router.put('/:id', reservaController.updateReserva);

router.delete('/:id', reservaController.deleteReserva);

export const reservaRoutes = router;