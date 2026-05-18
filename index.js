// Importamos o módulo Express (para o servidor) e o FS (File System, para ler/escrever arquivos)
const express = require('express');
const fs = require('fs');

const app = express();

// O "Middleware" express.json() é crucial. Ele instrui o servidor a 
// converter automaticamente os dados que chegam no formato JSON para objetos JavaScript.
app.use(express.json());

const CAMINHO_ARQUIVO = './dados.json';

// --- ROTA GET: CONSULTA ---
// Quando o cliente acessa a URL via navegador ou ferramenta de teste.
app.get('/usuarios', (req, res) => {
    // Lemos o arquivo JSON do disco
    fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
        if (err) {
            // Se o arquivo não existir ou houver erro, retornamos Status 500 (Erro de Servidor)
            return res.status(500).json({ mensagem: "Erro ao acessar a base de dados." });
        }
        // Transformamos o texto do arquivo em um Objeto/Lista real de JavaScript
        const listaOriginal = JSON.parse(data);
        res.status(200).json(listaOriginal);
    });
});


// Rota para buscar um usuário específico pelo ID
// O ":id" na URL é um parâmetro dinâmico (variável)
app.get('/usuarios/:id', (req, res) => {
    // 1. Capturamos o ID enviado na URL
    // Importante: Parâmetros de URL chegam como Texto (String). 
    // Como nosso JSON usa números, convertemos com parseInt.
    const idProcurado = parseInt(req.params.id);

    // 2. Lemos o arquivo de dados
    fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao ler a base de dados." });
        }

        // 3. Convertemos o texto do JSON para um Array de objetos JavaScript
        const usuarios = JSON.parse(data);

        // 4. Utilizamos o método .find() para localizar o objeto com o ID correspondente
        const usuarioEncontrado = usuarios.find(u => u.id === idProcurado);

        // 5. Verificação de existência (Tratamento de Erro)
        if (usuarioEncontrado) {
            // Se encontrar, retornamos o objeto e o status 200 (OK)
            res.status(200).json(usuarioEncontrado);
        } else {
            // Se não encontrar, retornamos status 404 (Not Found)
            res.status(404).json({ mensagem: "Usuário não localizado em nossa base." });
        }
    });
});

// Rota Raiz: Serve para verificar se o servidor está online e dar orientações
app.get('/', (req, res) => {
    res.send("Bem-vindo à aplicação de Usuários! Para ver a lista, acesse /usuarios");
});



app.listen(3000, () => console.log("Servidor ativo na porta 3000"));

