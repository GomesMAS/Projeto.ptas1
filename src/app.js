const express = require('express');
const produtosRoutes = require('./routes/produtosRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

const app = express();

app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/vendas', vendaRoutes);

app.get('/', (req, res) => {
  return res.json({ status: 'API rodando com sucesso!' });
});

module.exports = app;
