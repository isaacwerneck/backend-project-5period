const express = require('express');
const rotas = require('./rotas.js');

const app = express();

app.use(express.json());

rotas.forEach((registrarRota) => registrarRota(app));

app.listen(3000, () => console.log('Servidor ativo na porta 3000'));
