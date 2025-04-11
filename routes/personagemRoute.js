const express = require('express');
const router = express.Router();

const personagens = [];
let idAtual = 1;

router.post('/', (req, res) => {
  const { nome, nomeAventureiro, classe, level, forca, defesa, itensMagicos = [] } = req.body;

  // Validação da classe
  const classesPermitidas = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];
  if (!classesPermitidas.includes(classe)) {
    return res.status(400).json({ erro: 'Classe inválida.' });
  }

  // Validação de pontos (força + defesa <= 10)
  if ((forca + defesa) > 10) {
    return res.status(400).json({ erro: 'A soma de Força e Defesa deve ser no máximo 10.' });
  }

  // Validação de apenas 1 amuleto
  const amuletos = itensMagicos.filter(item => item.tipo === 'Amuleto');
  if (amuletos.length > 1) {
    return res.status(400).json({ erro: 'O personagem só pode ter 1 amuleto.' });
  }

  const novoPersonagem = {
    id: idAtual++,
    nome,
    nomeAventureiro,
    classe,
    level,
    forca,
    defesa,
    itensMagicos
  };

  personagens.push(novoPersonagem);
  res.status(201).json(novoPersonagem);
});

module.exports = router;
