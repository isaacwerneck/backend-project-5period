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



app.listen(3000, () => console.log("Servidor ativo na porta 3000"));