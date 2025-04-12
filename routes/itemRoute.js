const express = require('express');
const router = express.Router();
const {
  adicionarItem,
  listarItens,
  buscarItemPorId,
  removerItem,
  listarItensPorPersonagem,
  buscarAmuletoPorPersonagem,
} = require('../models/itemModel');

router.post('/', (req, res) => {
  try {
    const novoItem = adicionarItem(req.body);
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(listarItens());
});

router.get('/:id', (req, res) => {
  try {
    const item = buscarItemPorId(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const itemRemovido = removerItem(req.params.id);
    res.json(itemRemovido);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
});

module.exports = router;
