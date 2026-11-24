import express from 'express';
import produtosRoutes from './routes/produtosRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';

const app = express();

app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/vendas', vendaRoutes);

app.get('/', (req, res) => {
  return res.json({ status: 'API rodando com sucesso!' });
});

export default app;