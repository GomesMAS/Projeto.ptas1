const VendaModel = require('../models/venda.model');
const db = require('../config/database');

class VendaService {
  async registrarVenda(dados) {
    const { produto_id, quantidade } = dados;

    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM produtos WHERE id = ?', [produto_id], async (err, produto) => {
        if (err) return reject(err);
        if (!produto) return reject(new Error('Produto não encontrado.'));
        if (produto.quantidade < quantidade) return reject(new Error('Estoque insuficiente.'));

        const total = produto.preco * quantidade;

        db.run('UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?', [quantidade, produto_id], async (updateErr) => {
          if (updateErr) return reject(updateErr);

          try {
            const novaVenda = await VendaModel.create({ produto_id, quantidade, total });
            resolve(novaVenda);
          } catch (modelErr) {
            reject(modelErr);
          }
        });
      });
    });
  }
}

module.exports = new VendaService();
