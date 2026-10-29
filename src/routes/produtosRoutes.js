import { Router } from 'express';
import { 
    listarProdutos, 
    obterProdutoId, 
    criarProduto, 
    atualizarProduto, 
    deletarProduto 
} from '../controllers/produtoController.js';

const router = Router();

router.get('/', listarProdutos);
router.get('/:id', obterProdutoId);
router.post('/', criarProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
