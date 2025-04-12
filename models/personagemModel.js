const { v4: uuidv4 } = require('uuid');

const classesPermitidas = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];

let personagens = [];

function criarPersonagem(data) {
  if (!classesPermitidas.includes(data.classe)) {
    throw new Error('Classe inválida! As classes permitidas são: Guerreiro, Mago, Arqueiro, Ladino e Bardo.');
  }
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
  
    const itens = personagem.itens;
  
    if (item.tipo === 'Amuleto') {
      if (itens.length > 0) {
        throw new Error('Personagem já possui itens. Não pode receber um Amuleto.');
      }
    } else {
      const possuiAmuleto = itens.some(i => i.tipo === 'Amuleto');
      if (possuiAmuleto) {
        throw new Error('Personagem já possui um Amuleto e não pode receber outros itens.');
      }
    }
  
    itens.push(item);
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
