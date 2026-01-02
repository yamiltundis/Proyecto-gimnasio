import { Router } from "express";
import * as pagoController from '../controllers/pago.controller'

const router = Router();

router.get('/', pagoController.getAllPagos);

router.get('/:id', pagoController.getPagoById);

router.post('/', pagoController.createPago);

router.put('/:id', pagoController.updatePago);

router.delete('/:id', pagoController.deletePago);

export const pagoRoutes = router;