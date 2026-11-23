import * as produtoService from '../services/produtosService.js';

export function listarProdutos  (req, res)  {
    const lista = produtoService.buscarTodos();
    res.status(200).json(lista);
};

export function obterProdutoPorId (req, res)  {
    const id = parseInt(req.params.id, 10);
    const produto = produtoService.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json(produto);
};

export function criarProduto (req, res) {
    const { nome, preco, quantEstoque } = req.body;

    if (!nome || preco === undefined || quantEstoque === undefined) {
        return res.status(400).json({ error: 'Os campos "nome", "preco" e "quantEstoque" são obrigatórios.' });
    }

    const novo = produtoService.criar(req.body);
    res.status(201).json(novo);
};

export function atualizarProduto (req, res) {
    const id = parseInt(req.params.id, 10);
    const produtoAtualizado = produtoService.atualizar(id, req.body);

    if (!produtoAtualizado) {
        return res.status(404).json({ error: "Produto não encontrado para atualização." });
    }

    res.status(200).json(produtoAtualizado);
};

export function deletarProduto(req, res){
    const id = parseInt(req.params.id, 10);
    const removido = produtoService.deletar(id);

    if (!removido) {
        return res.status(404).json({ error: "Produto não encontrado para exclusão." });
    }

    res.status(200).json({ message: "Produto removido com sucesso.", produto: removido });
};
