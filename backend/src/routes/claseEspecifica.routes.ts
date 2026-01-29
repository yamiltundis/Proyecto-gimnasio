import { Router } from "express";
import * as claseEspecificaController from '../controllers/claseEspecifica.controller';
import { validate } from "../middlewares/validation.middleware";
import { createClaseEspecificaSchema, updateClaseEspecificaSchema, createClaseEspecificaConPatronSchema } from "../validations/claseEspecifica.validations";

const router = Router();

router.get('/', claseEspecificaController.getAllClasesEspecificas);

router.get('/:id', claseEspecificaController.getClaseEspecificaById);

router.post('/', validate(createClaseEspecificaSchema), claseEspecificaController.createClaseEspecifica);

router.post('/conpatron', validate(createClaseEspecificaConPatronSchema), claseEspecificaController.createClaseEspecificaConPatron);

router.put('/:id', validate(updateClaseEspecificaSchema),claseEspecificaController.updateClaseEspecifica);

router.delete('/:id', claseEspecificaController.deleteClaseEspecifica);

export const claseEspecificaRoutes = router;