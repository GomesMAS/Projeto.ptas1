const produtosService = require('../services/produtosService');

class ProdutoController {
  async listar(req, res) {
    try {
      const produtos = await produtosService.listarProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async criar(req, res) {
    try {
      const novoProduto = await produtosService.cadastrarProduto(req.body);
      return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();
