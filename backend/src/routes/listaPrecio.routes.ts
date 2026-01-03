import { Router } from "express";
import * as listaPrecioController from '../controllers/listaPrecio.controller'

const router = Router();

router.get('/', listaPrecioController.getAllListasPrecios);

router.get('/ultimo/:membreciaId', listaPrecioController.getUltimoPrecioByMembrecia)

router.get('/:id', listaPrecioController.getListaPrecioById);

router.post('/', listaPrecioController.createListaPrecio);

router.put('/:id', listaPrecioController.updateListaPrecio);

router.delete('/:id', listaPrecioController.deleteListaPrecio);

export const listaPrecioRoutes = router;