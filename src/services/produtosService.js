import * as ProdutoModel from '../models/produtos.model.js';

class ProdutosService {
  async listarProdutos() {
    return await ProdutoModel.buscarTodas();
  }

  async buscarPorId(id) {
    return await ProdutoModel.buscarPorId(id);
  }

  async cadastrarProduto(dados) {
    if (!dados.nome || dados.preco <= 0 || dados.quantidade < 0) {
      throw new Error('Dados do produto inválidos.');
    }
    return await ProdutoModel.inserir(dados);
  }

  async atualizar(id, dados) {
    return await ProdutoModel.atualizar(id, dados);
  }

  async deletar(id) {
    return await ProdutoModel.remover(id);
  }
}

export default new ProdutosService();