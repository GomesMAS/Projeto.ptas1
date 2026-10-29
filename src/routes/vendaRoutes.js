import { Router } from 'express';
import { listarVendas, criarVenda } from '../controllers/vendaController.js';

const router = Router();

router.get('/', listarVendas);
router.post('/', criarVenda);

export default router;
