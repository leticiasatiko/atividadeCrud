const { v4: uuidv4 } = require('uuid');

const personagens = [];

const CLASSES_VALIDAS = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];

function criarPersonagem(data) {
  const { nome, nomeAventureiro, classe, level, forca, defesa } = data;

  if (forca + defesa !== 10) {
    throw new Error('A soma de força e defesa deve ser exatamente 10');
  }

  if (!CLASSES_VALIDAS.includes(classe)) {
    throw new Error('Classe inválida');
  }

  const novoPersonagem = {
    id: uuidv4(),
    nome,
    nomeAventureiro,
    classe,
    level,
    itens: [],
    forca,
    defesa,
  };

  personagens.push(novoPersonagem);
  return novoPersonagem;
}

function listarPersonagens() {
  return personagens.map(personagem => {
    const atributosExtras = personagem.itens.reduce((acc, item) => {
      acc.forca += item.forca || 0;
      acc.defesa += item.defesa || 0;
      return acc;
    }, { forca: 0, defesa: 0 });

    return {
      ...personagem,
      forcaTotal: personagem.forca + atributosExtras.forca,
      defesaTotal: personagem.defesa + atributosExtras.defesa,
    };
  });
}

module.exports = { criarPersonagem, listarPersonagens, personagens };
