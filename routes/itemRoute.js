const express = require('express');
const router = express.Router();
const {
  criarItemMagico,
  listarItensMagicos,
  listarTotalItensMagicos,
  buscarItemMagicoPorId,
  removerItemMagico
} = require('../models/itemModel');

// Cadastrar Item Mágico
router.post('/', (req, res) => {
  try {
    const item = criarItemMagico(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Listar Itens Mágicos
router.get('/', (req, res) => {
  res.json(listarItensMagicos());
});

// Listar Total de Itens Mágicos
router.get('/total', (req, res) => {
  const total = listarTotalItensMagicos();
  res.json({ total });
});

// Buscar Item Mágico por ID
router.get('/:id', (req, res) => {
  const item = buscarItemMagicoPorId(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ erro: 'Item não encontrado.' });
  }
});

// Remover Item Mágico
router.delete('/:id', (req, res) => {
  try {
    removerItemMagico(req.params.id);
    res.json({ mensagem: 'Item removido com sucesso.' });
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
});

module.exports = router;
