import express from 'express';
import personagemRoutes from './routes/routes_personagem.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/', personagemRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});