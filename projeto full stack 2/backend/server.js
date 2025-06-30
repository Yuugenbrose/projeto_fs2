// Importa as dependências que acabamos de instalar
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // ADICIONE ESTA LINHA
const compression = require('compression'); // Adicione esta linha
require('dotenv').config(); // Carrega as variáveis de ambiente

// Cria a aplicação Express
const app = express();

// Configura os middlewares
app.use(helmet()); // ADICIONE ESTA LINHA
app.use(compression()); // Adicione esta linha para comprimir as respostas
app.use(cors()); // Habilita o CORS para permitir a comunicação com o front-end
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON
app.use('/api', require('./src/routes/authRoutes'));
app.use('/api/clima', require('./src/routes/climaRoutes'));

// Rota de teste inicial
app.get('/', (req, res) => {
  res.send('Servidor Back-end está rodando!');
});

// Define a porta a partir das variáveis de ambiente ou usa uma porta padrão
const PORT = process.env.PORT || 5000;

// Carrega os certificados
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Inicia o servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});