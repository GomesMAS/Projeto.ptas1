import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: "Arroz 5kg", preco: 25.0, quantEstoque: 10, estoqueMinimo: 2 },
    { id: 2, nome: "Feijão 1kg", preco: 8.5, quantEstoque: 20, estoqueMinimo: 5 }
];

const vendas = [];
let proximoProdutoId = 3;
let proximoVendaId = 1;

app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json(produto);
});

app.post('/produtos', (req, res) => {
    const { nome, preco, quantEstoque, estoqueMinimo } = req.body;

    if (!nome || preco === undefined || quantEstoque === undefined) {
        return res.status(400).json({ error: 'Os campos "nome", "preco" e "quantEstoque" são obrigatórios.' });
    }

    const novoProduto = {
        id: proximoProdutoId++,
        nome,
        preco: Number(preco),
        quantEstoque: Number(quantEstoque),
        estoqueMinimo: Number(estoqueMinimo || 0)
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    const { nome, preco, quantEstoque, estoqueMinimo } = req.body;

    if (nome) produto.nome = nome;
    if (preco !== undefined) produto.preco = Number(preco);
    if (quantEstoque !== undefined) produto.quantEstoque = Number(quantEstoque);
    if (estoqueMinimo !== undefined) produto.estoqueMinimo = Number(estoqueMinimo);

    res.status(200).json(produto);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    const removido = produtos.splice(index, 1);
    res.status(200).json({ message: "Produto removido com sucesso.", produto: removido[0] });
});


app.get('/vendas', (req, res) => {
    res.status(200).json(vendas);
});

app.post('/vendas', (req, res) => {
    const { itens } = req.body; 

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: 'A venda deve conter pelo menos um item no array "itens".' });
    }

    // regra de negocio: verificar se ha saldo em estoque para itens antes de confirmar
    for (const item of itens) {
        const produto = produtos.find(p => p.id === item.produtoId);

        if (!produto) {
            return res.status(404).json({ error: `Produto ID ${item.produtoId} não encontrado.` });
        }

        if (produto.quantEstoque < item.quantidade) {
            return res.status(400).json({
                error: `Estoque insuficiente para o produto '${produto.nome}'. Estoque atual: ${produto.quantEstoque}, Solicitado: ${item.quantidade}`
            });
        }
    }

    let valorTotal = 0;
    const itensProcessados = [];

    for (const item of itens) {
        const produto = produtos.find(p => p.id === item.produtoId);

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
    res.status(201).json(novaVenda);
});

app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada." });
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
