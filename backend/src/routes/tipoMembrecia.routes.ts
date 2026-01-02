import { Router } from "express";
import * as tipoMembreciaController from '../controllers/tipoMembrecia.controller'

const router = Router();

router.get('/', tipoMembreciaController.getAllTiposMembrecias);

router.get('/:id', tipoMembreciaController.getTipoMembreciaById);

router.post('/', tipoMembreciaController.createTipoMembrecia);

router.put('/:id', tipoMembreciaController.updateTipoMembrecia);

router.delete('/:id', tipoMembreciaController.deleteTipoMembrecia);

export const tipoMembreciaRoutes = router;