import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada." });
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});
