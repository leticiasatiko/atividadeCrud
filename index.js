const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const personagemRoutes = require('./routes/personagemRoute');
const itemRoutes = require('./routes/itemRoute');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger/swagger.yaml');

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Roteamento das rotas dos personagens e itens mágicos
app.use('/personagens', personagemRoutes);
app.use('/itens', itemRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);  // Para depuração
  res.status(500).json({ erro: 'Algo deu errado!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
