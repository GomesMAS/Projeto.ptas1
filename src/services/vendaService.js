import * as VendaModel from '../models/venda.model.js';
import * as ProdutoModel from '../models/produtos.model.js';

class VendaService {
  async buscarTodasVendas() {
    return await VendaModel.buscarTodas();
  }

  async registrarVenda(dados) {
    const produtoId = dados.produtoId || dados.produto_id;
    const { quantidade } = dados;

    const produto = await ProdutoModel.buscarPorId(produtoId);
    if (!produto) throw new Error('Produto não encontrado.');
    if (produto.quantidade < quantidade) throw new Error('Estoque insuficiente.');

    const total = produto.preco * quantidade;
    await ProdutoModel.atualizar(produtoId, { quantidade: produto.quantidade - quantidade });

    return await VendaModel.inserir({ produtoId, quantidade, total });
  }
}

export default new VendaService();