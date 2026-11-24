import app from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = 3000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});