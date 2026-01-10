import { Router } from "express";
import * as pagoController from '../controllers/pago.controller'
import { validate } from "../middlewares/validation.middleware";
import { createPagoSchema, updatePagoSchema } from "../validations/pago.validations";

const router = Router();

router.get('/', pagoController.getAllPagos);

router.get('/:id', pagoController.getPagoById);

router.post('/', validate(createPagoSchema), pagoController.createPago);

router.put('/:id', validate(updatePagoSchema), pagoController.updatePago);

router.delete('/:id', pagoController.deletePago);

export const pagoRoutes = router;