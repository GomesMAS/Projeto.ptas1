
import { Router } from 'express'
import produtoController from '../controllers/produtoController'

const router = Router();

router.get('/', produtoController.listar);
router.post('/', produtoController.criar);

export default router;

