import http from 'node:http';
import { URL } from 'node:url';

const port = 3000;
const tarefas = [
    { id: 1, nome: "lavar louças" }, 
    { id: 2, nome: "limpar quarto" }
];

const server = http.createServer((req, res) => {
    const urlobj = new URL(req.url, `http://${req.headers.host}`);
    
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && urlobj.pathname === '/tarefas') {
        res.statusCode = 200;
        res.end(JSON.stringify(tarefas));
    }
    else if (req.method === 'POST' && urlobj.pathname === '/tarefa') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const novatarefa = JSON.parse(body);

                if (!novatarefa.nome) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ error: 'O campo "nome" é obrigatório.' }));
                }

                const tarefaCriada = { 
                    id: tarefas.length + 1, 
                    nome: novatarefa.nome 
                };
                
                tarefas.push(tarefaCriada);
                res.statusCode = 201;
                return res.end(JSON.stringify(tarefaCriada));

            } catch (error) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ 
                    error: 'Formato JSON inválido. Verifique a sintaxe da sua requisição.' 
                }));
            }
        });
    }
    else if (req.method === "GET" && urlobj.pathname === "/tarefas/busca") {
        const nomeBusca = urlobj.searchParams.get('nome');
        
        if (!nomeBusca) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: "O parâmetro 'nome' é obrigatório." }));
        }

        const filtro = tarefas.filter(tarefa => 
            tarefa.nome.toLowerCase().includes(nomeBusca.toLowerCase())
        );

        res.statusCode = 200;
        res.end(JSON.stringify(filtro));
    }
    else if (req.method === 'DELETE' && urlobj.pathname === '/tarefas') {
        const indexStr = urlobj.searchParams.get('index');
        const index = parseInt(indexStr, 10);

        if (isNaN(index) || index < 0 || index >= tarefas.length) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'Índice inválido ou não fornecido.' }));
        }

        const remover = tarefas.splice(index, 1);
        res.statusCode = 200;
        return res.end(JSON.stringify({ message: 'Tarefa removida com sucesso', tarefa: remover[0] }));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Rota nao encontrada' }));
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
