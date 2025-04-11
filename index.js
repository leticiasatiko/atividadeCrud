const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const personagemRoutes = require('./routes/personagemRoute');
const itemRoutes = require('./routes/itemRoute');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/personagens', personagemRoutes);
app.use('/itens', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
