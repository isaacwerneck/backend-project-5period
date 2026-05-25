const fs = require('fs');
const CAMINHO_ARQUIVO = './dados.json';

function rotaGetUsuarios(app) {
    app.get('/usuarios', (req, res) => {
        fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao acessar a base de dados.' });
            }

            const listaOriginal = JSON.parse(data);
            res.status(200).json(listaOriginal);
        });
    });
}

function rotaGetUsuarioPorId(app) {
    app.get('/usuarios/:id', (req, res) => {
        const idProcurado = parseInt(req.params.id, 10);

        fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao ler a base de dados.' });
            }

            const usuarios = JSON.parse(data);
            const usuarioEncontrado = usuarios.find((u) => u.id === idProcurado);

            if (usuarioEncontrado) {
                return res.status(200).json(usuarioEncontrado);
            }

            return res.status(404).json({ mensagem: 'Usuário não localizado em nossa base.' });
        });
    });
}

function rotaPostUsuario(app) {
    app.post('/usuarios', (req, res) => {
        const novoUsuario = req.body;

        fs.readFile(CAMINHO_ARQUIVO, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao acessar a base de dados.' });
            }

            const usuarios = JSON.parse(data);
            const ultimoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id : 0;

            novoUsuario.id = ultimoId + 1;
            usuarios.push(novoUsuario);

            fs.writeFile(CAMINHO_ARQUIVO, JSON.stringify(usuarios, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ mensagem: 'Erro ao salvar o novo usuário.' });
                }

                return res.status(201).json(novoUsuario);
            });
        });

        console.log('Recebemos um novo usuário:', novoUsuario);
    });
}

function rotaRaiz(app) {
    app.get('/', (req, res) => {
        res.send('Bem-vindo à aplicação de Usuários! Para ver a lista, acesse /usuarios');
    });
}

const rotas = [
    rotaRaiz,
    rotaGetUsuarios,
    rotaGetUsuarioPorId,
    rotaPostUsuario,
];

module.exports = rotas;
