const { v4: uuidv4 } = require('uuid');

// Lista de classes permitidas
const CLASSES_PERMITIDAS = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];

let personagens = [];

function criarPersonagem(data) {
  // Valida a classe
  if (!CLASSES_PERMITIDAS.includes(data.classe)) {
    throw new Error('Classe inválida! As classes permitidas são: Guerreiro, Mago, Arqueiro, Ladino e Bardo.');
  }
  // Valida a distribuição de pontos: soma de forca e defesa deve ser <= 10 (pode ser igual ou menor que 10)
  if ((data.forca || 0) + (data.defesa || 0) > 10) {
    throw new Error('A soma de Força e Defesa não pode ultrapassar 10 pontos.');
  }
  const novoPersonagem = {
    id: uuidv4(),
    nome: data.nome,
    nomeAventureiro: data.nomeAventureiro,
    classe: data.classe,
    level: data.level || 1,
    forcaBase: data.forca || 0,
    defesaBase: data.defesa || 0,
    itens: []
  };
  personagens.push(novoPersonagem);
  return novoPersonagem;
}

function listarPersonagens() {
  // Ao listar, atualizamos os atributos somando os valores dos itens
  return personagens.map(p => {
    const somaForcaItens = p.itens.reduce((acc, item) => acc + item.forca, 0);
    const somaDefesaItens = p.itens.reduce((acc, item) => acc + item.defesa, 0);
    return {
      ...p,
      forca: p.forcaBase + somaForcaItens,
      defesa: p.defesaBase + somaDefesaItens
    };
  });
}

function buscarPersonagemPorId(id) {
  return personagens.find(p => p.id === id);
}

function atualizarNomePersonagem(id, novoNome) {
  const personagem = buscarPersonagemPorId(id);
  if (!personagem) {
    throw new Error('Personagem não encontrado.');
  }
  personagem.nome = novoNome;
  return personagem;
}

function removerPersonagem(id) {
  const index = personagens.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Personagem não encontrado.');
  }
  personagens.splice(index, 1);
}

function adicionarItemAoPersonagem(personagemId, item) {
  const personagem = buscarPersonagemPorId(personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado.');
  }
  // Regra: Personagem só pode possuir 1 Amuleto
  if (item.tipo === 'Amuleto') {
    const jaPossuiAmuleto = personagem.itens.some(i => i.tipo === 'Amuleto');
    if (jaPossuiAmuleto) {
      throw new Error('Personagem já possui um Amuleto.');
    }
  }
  // Adiciona o item na lista do personagem
  personagem.itens.push(item);
  return item;
}

module.exports = {
  criarPersonagem,
  listarPersonagens,
  buscarPersonagemPorId,
  atualizarNomePersonagem,
  removerPersonagem,
  adicionarItemAoPersonagem
};
