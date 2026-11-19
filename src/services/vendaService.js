
const vendaService = require('../services/vendaService');

class VendaController {
  async criar(req, res) {
    try {
      const novaVenda = await vendaService.registrarVenda(req.body);
      return res.status(201).json(novaVenda);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new VendaController();
