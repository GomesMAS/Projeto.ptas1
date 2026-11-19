
const { Router } = require('express');
const produtoController = require('../controllers/produtoController');

const router = Router();

router.get('/', produtoController.listar);
router.post('/', produtoController.criar);

module.exports = router;

