const express = require('express');
const router = express.Router();
const { criarPersonagem, listarPersonagens } = require('../models/personagemModel');

router.post('/', (req, res) => {
  try {
    const novo = criarPersonagem(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(listarPersonagens());
});

module.exports = router;
