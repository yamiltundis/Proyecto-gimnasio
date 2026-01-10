import { Router } from "express";
import * as listaPrecioController from '../controllers/listaPrecio.controller'
import { validate } from "../middlewares/validation.middleware";
import { createListaPrecioSchema, updateListaPrecioSchema } from "../validations/listaPrecio.validations";

const router = Router();

router.get('/', listaPrecioController.getAllListasPrecios);

router.get('/ultimo/:membreciaId', listaPrecioController.getUltimoPrecioByMembrecia)

router.get('/:id', listaPrecioController.getListaPrecioById);

router.post('/', validate(createListaPrecioSchema), listaPrecioController.createListaPrecio);

router.put('/:id', validate(updateListaPrecioSchema), listaPrecioController.updateListaPrecio);

router.delete('/:id', listaPrecioController.deleteListaPrecio);

export const listaPrecioRoutes = router;