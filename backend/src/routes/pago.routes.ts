import { Router } from "express";
import * as pagoController from '../controllers/pago.controller'
import { validate } from "../middlewares/validation.middleware";
import { createPagoSchema, updatePagoSchema } from "../validations/pago.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get('/admin', pagoController.getAllPagos);

router.get('/cliente', authenticate, authorize("cliente"), pagoController.getAllPagosByCliente);

router.get('/:id', pagoController.getPagoById);

router.post('/', validate(createPagoSchema), pagoController.createPago);

router.put('/:id', validate(updatePagoSchema), pagoController.updatePago);

router.delete('/:id', pagoController.deletePago);

export const pagoRoutes = router;