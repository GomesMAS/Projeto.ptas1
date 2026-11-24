import { Router } from 'express';
import vendaController from '../controllers/vendaController.js';

const router = Router();

router.get('/', (req, res) => vendaController.listar(req, res));
router.post('/', (req, res) => vendaController.criar(req, res));

export default router;