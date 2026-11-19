const { Router } = require('express');
const vendaController = require('../controllers/vendaController');

const router = Router();

router.post('/', vendaController.criar);

module.exports = router;

