import * as vendaService from '../services/vendaService.js';

export const listarVendas = (req, res) => {
    const lista = vendaService.buscarTodasVendas();
    res.status(200).json(lista);
};

export const criarVenda = (req, res) => {
    const { itens } = req.body; 

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: 'A venda deve conter pelo menos um item no array "itens".' });
    }

    try {
        const novaVenda = vendaService.realizarVenda(itens);
        res.status(201).json(novaVenda);
    } catch (error) {
        const [tipo, arg1, arg2, arg3] = error.message.split(':');

        if (tipo === 'PRODUTO_NAO_ENCONTRADO') {
            return res.status(404).json({ error: `Produto ID ${arg1} não encontrado.` });
        }
        if (tipo === 'ESTOQUE_INSUFICIENTE') {
            return res.status(400).json({
                error: `Estoque insuficiente para o produto '${arg1}'. Estoque atual: ${arg2}, Solicitado: ${arg3}`
            });
        }

        res.status(500).json({ error: "Erro interno no servidor ao processar a venda." });
    }
};
