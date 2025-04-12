const express = require('express');
const router = express.Router();
const {
  criarPersonagem,
  listarPersonagens,
  buscarPersonagemPorId,
  atualizarNomePersonagem,
  removerPersonagem,
  adicionarItemAoPersonagem
} = require('../models/personagemModel');
const { buscarItemMagicoPorId } = require('../models/itemModel');

router.post('/', (req, res) => {
  try {
    const personagem = criarPersonagem(req.body);
    res.status(201).json(personagem);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(listarPersonagens());
});

router.get('/total', (req, res) => {
  const total = listarPersonagens().length;
  res.json({ total });
});

router.get('/:id', (req, res) => {
  const personagem = buscarPersonagemPorId(req.params.id);
  if (personagem) {
    const somaForcaItens = personagem.itens.reduce((acc, i) => acc + i.forca, 0);
    const somaDefesaItens = personagem.itens.reduce((acc, i) => acc + i.defesa, 0);
    res.json({
      ...personagem,
      forca: personagem.forcaBase + somaForcaItens,
      defesa: personagem.defesaBase + somaDefesaItens
    });
  } else {
    res.status(404).json({ erro: 'Personagem não encontrado.' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const personagem = atualizarNomePersonagem(req.params.id, req.body.nome);
    res.json(personagem);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    removerPersonagem(req.params.id);
    res.json({ mensagem: 'Personagem removido com sucesso.' });
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
});

router.post('/:id/itens', (req, res) => {
  try {
    const { itemId } = req.body;
    const item = buscarItemMagicoPorId(itemId);
    if (!item) {
      return res.status(404).json({ erro: 'Item mágico não encontrado.' });
    }
    const itemAdicionado = adicionarItemAoPersonagem(req.params.id, item);
    res.json(itemAdicionado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/:id/itens', (req, res) => {
  const personagem = buscarPersonagemPorId(req.params.id);
  if (!personagem) {
    return res.status(404).json({ erro: 'Personagem não encontrado.' });
  }
  res.json(personagem.itens);
});

router.get('/:id/itens/amuleto', (req, res) => {
  const personagem = buscarPersonagemPorId(req.params.id);
  if (!personagem) {
    return res.status(404).json({ erro: 'Personagem não encontrado.' });
  }
  const amuleto = personagem.itens.find(item => item.tipo === 'Amuleto');
  if (!amuleto) {
    return res.status(404).json({ erro: 'Amuleto não encontrado.' });
  }
  res.json(amuleto);
});

module.exports = router;
