
const ProdutoModel = require('../models/produtos.model');

class ProdutosService {
  async listarProdutos() {
    return await ProdutoModel.findAll();
  }

  async cadastrarProduto(dados) {
    if (!dados.nome || dados.preco <= 0 || dados.quantidade < 0) {
      throw new Error('Dados do produto inválidos.');
    }
    return await ProdutoModel.create(dados);
  }
}

export default ProdutosService();
