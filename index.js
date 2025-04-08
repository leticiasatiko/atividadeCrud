import express from 'express';
import bodyParser from 'body-parser';
import persoRoutes from './routes/personagens.js';

const app = express();
const PORT = 5000

app.use(bodyParser.json());

app.use('/personagens', persoRoutes);

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));