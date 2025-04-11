import express from 'express';
import Personagem from '../models/model_personagem.js';
import { personagens } from '../db/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('teste');
  });

router.get('/personagem', (req, res) => {
  res.json(personagens);
});

export default router;