import * as produtoService from '../services/produtoService.js';

export const listarProdutos = (req, res) => {
    const lista = produtoService.buscarTodos();
    res.status(200).json(lista);
};

export const obterProdutoPorId = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const produto = produtoService.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json(produto);
};

export const criarProduto = (req, res) => {
    const { nome, preco, quantEstoque } = req.body;

    if (!nome || preco === undefined || quantEstoque === undefined) {
        return res.status(400).json({ error: 'Os campos "nome", "preco" e "quantEstoque" são obrigatórios.' });
    }

    const novo = produtoService.criar(req.body);
    res.status(201).json(novo);
};

export const atualizarProduto = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const produtoAtualizado = produtoService.atualizar(id, req.body);

    if (!produtoAtualizado) {
        return res.status(404).json({ error: "Produto não encontrado para atualização." });
    }

    res.status(200).json(produtoAtualizado);
};

export const deletarProduto = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const removido = produtoService.deletar(id);

    if (!removido) {
        return res.status(404).json({ error: "Produto não encontrado para exclusão." });
    }

    res.status(200).json({ message: "Produto removido com sucesso.", produto: removido });
};
