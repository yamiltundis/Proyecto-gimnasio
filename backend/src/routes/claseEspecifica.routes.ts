import { Router } from "express";
import * as claseEspecificaController from '../controllers/claseEspecifica.controller'

const router = Router();

router.get('/', claseEspecificaController.getAllClasesEspecificas);

router.get('/:id', claseEspecificaController.getClaseEspecificaById);

router.post('/', claseEspecificaController.createClaseEspecifica);

router.put('/:id', claseEspecificaController.updateClaseEspecifica);

router.delete('/:id', claseEspecificaController.deleteClaseEspecifica);

export const claseEspecificaRoutes = router;