import { Router } from "express";
import * as membreciaActivaController from '../controllers/membreciaActiva.controller'

const router = Router();

router.get('/:id', membreciaActivaController.getUltimaMembreciaActiva)

export const membreciaActivaRoutes = router;