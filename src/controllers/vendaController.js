import vendaService from '../services/vendaService.js';

class VendaController {
  async listar(req, res) {
    const lista = await vendaService.buscarTodasVendas();
    res.status(200).json(lista);
  }

  async criar(req, res) {
    try {
      const novaVenda = await vendaService.registrarVenda(req.body);
      return res.status(201).json(novaVenda);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new VendaController();