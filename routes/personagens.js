import express from 'express';
const router = express.Router();

const personagens = [
  {
    id: 1,
    nome: 'Joao',
    nomeAvent: 'Jorgin',
    classe: 'Arqueiro',
    level: 5,
    itensList: ["Item1", "Item2"],
    forca: 5,
    defesa: 5
  },
  {
    id: 2,
    nome: 'Maria',
    nomeAvent: 'Myth',
    classe: 'Guerreiro',
    level: 1,
    itensList: ["Item1", "Item2"],
    forca: 5,
    defesa: 5
  },
];

router.get('/', (req, res) => {
    res.send(personagens);
})

export default router