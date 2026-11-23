import { Router } from('express')
import vendaController from '../controllers/vendaController'

const router = Router();

router.post('/', vendaController.criar);

export default router;

