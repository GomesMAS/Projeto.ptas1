import produtosService from '../services/produtosService.js';

class ProdutoController {
  async listar(req, res) {
    try {
      const produtos = await produtosService.listarProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async obterPorId(req, res) {
    const produto = await produtosService.buscarPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
  }

  async criar(req, res) {
    try {
      const novoProduto = await produtosService.cadastrarProduto(req.body);
      return res.status(201).json(novoProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    const produtoAtualizado = await produtosService.atualizar(req.params.id, req.body);
    if (!produtoAtualizado) {
      return res.status(404).json({ error: 'Produto não encontrado para atualização.' });
    }
    res.status(200).json(produtoAtualizado);
  }

  async deletar(req, res) {
    const removido = await produtosService.deletar(req.params.id);
    if (!removido) {
      return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
    }
    res.status(200).json({ message: 'Produto removido com sucesso.', produto: removido });
  }
}

export default new ProdutoController();