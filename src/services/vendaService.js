//regra de negocio


import { produtos, buscarPorId } from './produtoService.js';

const vendas = [];
let proximoVendaId = 1;

export const buscarTodasVendas = () => {
    return vendas;
};

export const realizarVenda = (itens) => {
    for (const item of itens) {
        const produto = buscarPorId(item.produtoId);

        if (!produto) {
            throw new Error(`PRODUTO_NAO_ENCONTRADO:${item.produtoId}`);
        }

        if (produto.quantEstoque < item.quantidade) {
            throw new Error(`ESTOQUE_INSUFICIENTE:${produto.nome}:${produto.quantEstoque}:${item.quantidade}`);
        }
    }

    let valorTotal = 0;
    const itensProcessados = [];

    for (const item of itens) {
        const produto = buscarPorId(item.produtoId);

        produto.quantEstoque -= item.quantidade;

        const subtotal = produto.preco * item.quantidade;
        valorTotal += subtotal;

        itensProcessados.push({
            produtoId: produto.id,
            nomeProduto: produto.nome,
            quantidade: item.quantidade,
            precoUnitario: produto.preco,
            subtotal
        });
    }

    const novaVenda = {
        id: proximoVendaId++,
        data: new Date().toISOString(),
        valorTotal,
        itens: itensProcessados
    };

    vendas.push(novaVenda);
    return novaVenda;
};
