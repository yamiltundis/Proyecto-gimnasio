import { Router } from "express";
import * as tipoMembreciaController from '../controllers/tipoMembrecia.controller'
import { validate } from "../middlewares/validation.middleware";
import { createTipoMembreciaSchema, updateTipoMembreciaSchema } from "../validations/tipoMembrecia.validations";

const router = Router();

router.get('/', tipoMembreciaController.getAllTiposMembrecias);

router.get('/:id', tipoMembreciaController.getTipoMembreciaById);

router.post('/', validate(createTipoMembreciaSchema), tipoMembreciaController.createTipoMembrecia);

router.put('/:id', validate(updateTipoMembreciaSchema),  tipoMembreciaController.updateTipoMembrecia);

router.delete('/:id', tipoMembreciaController.deleteTipoMembrecia);

export const tipoMembreciaRoutes = router;