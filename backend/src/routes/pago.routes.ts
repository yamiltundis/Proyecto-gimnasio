import { Router } from "express";
import * as pagoController from '../controllers/pago.controller'
import { validate } from "../middlewares/validation.middleware";
import { createPagoSchema, updatePagoSchema } from "../validations/pago.validations";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get('/admin', authenticate, authorize("admin"), pagoController.getAllPagos);

router.get('/cliente', authenticate, authorize("cliente"), pagoController.getAllPagosByCliente);

router.get('/:id', authenticate, authorize("admin"), pagoController.getPagoById);

router.post('/', authenticate, authorize("admin"), validate(createPagoSchema), pagoController.createPago);

router.put('/:id', authenticate, authorize("admin"), validate(updatePagoSchema), pagoController.updatePago);

router.delete('/:id', authenticate, authorize("admin"), pagoController.deletePago);

export const pagoRoutes = router;