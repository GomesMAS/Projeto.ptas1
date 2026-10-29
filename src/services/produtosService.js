export const produtos = [
    { id: 1, nome: "Arroz 5kg", preco: 25.0, quantEstoque: 10, estoqueMinimo: 2 },
    { id: 2, nome: "Feijão 1kg", preco: 8.5, quantEstoque: 20, estoqueMinimo: 5 }
];

let proximoProdutoId = 3;

export const buscarTodos = () => {
    return produtos;
};

export const buscarId = (id) => {
    return produtos.find(p => p.id === id);
};

export const criar = (dados) => {
    const { nome, preco, quantEstoque, estoqueMinimo } = dados;
    const novo = {
        id: proximoProdutoId++,
        nome,
        preco: Number(preco),
        quantEstoque: Number(quantEstoque),
        estoqueMinimo: Number(estoqueMinimo || 0)
    };
    produtos.push(novo);
    return novo;
};

export const atualizar = (id, dados) => {
    const produto = buscarId(id);
    if (!produto) return null;

    const { nome, preco, quantEstoque, estoqueMinimo } = dados;

    if (nome) produto.nome = nome;
    if (preco !== undefined) produto.preco = Number(preco);
    if (quantEstoque !== undefined) produto.quantEstoque = Number(quantEstoque);
    if (estoqueMinimo !== undefined) produto.estoqueMinimo = Number(estoqueMinimo);

    return produto;
};

export const deletar = (id) => {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;

    const [removido] = produtos.splice(index, 1);
    return removido;
};