const { v4: uuidv4 } = require('uuid');
const { personagens } = require('./personagemModel');

const TIPOS_VALIDOS = ['Arma', 'Armadura', 'Amuleto'];

function adicionarItem(data) {
  const { nome, tipo, forca = 0, defesa = 0, personagemId } = data;

  if (!TIPOS_VALIDOS.includes(tipo)) {
    throw new Error('Tipo de item inválido');
  }

  const personagem = personagens.find(p => p.id === personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado');
  }

  if (tipo === 'Amuleto') {
    const temAmuleto = personagem.itens.some(i => i.tipo === 'Amuleto');
    if (temAmuleto) throw new Error('Personagem já possui um Amuleto');
  }

  if (tipo === 'Arma' && defesa > 0) {
    throw new Error('Item do tipo Arma não pode ter defesa');
  }

  if (tipo === 'Armadura' && forca > 0) {
    throw new Error('Item do tipo Armadura não pode ter força');
  }

  const item = {
    id: uuidv4(),
    nome,
    tipo,
    forca,
    defesa,
  };

  personagem.itens.push(item);
  return item;
}

function listarItens() {
  return personagens.flatMap(personagem => personagem.itens);
}

function buscarItemPorId(itemId) {
  for (let personagem of personagens) {
    const item = personagem.itens.find(i => i.id === itemId);
    if (item) return item;
  }
  throw new Error('Item não encontrado');
}

function removerItem(itemId) {
  for (let personagem of personagens) {
    const itemIndex = personagem.itens.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      const itemRemovido = personagem.itens.splice(itemIndex, 1);
      return itemRemovido;
    }
  }
  throw new Error('Item não encontrado');
}

function listarItensPorPersonagem(personagemId) {
  const personagem = personagens.find(p => p.id === personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado');
  }
  return personagem.itens;
}

function buscarAmuletoPorPersonagem(personagemId) {
  const personagem = personagens.find(p => p.id === personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado');
  }
  const amuleto = personagem.itens.find(i => i.tipo === 'Amuleto');
  if (!amuleto) {
    throw new Error('Personagem não possui um Amuleto');
  }
  return amuleto;
}

module.exports = {
  adicionarItem,
  listarItens,
  buscarItemPorId,
  removerItem,
  listarItensPorPersonagem,
  buscarAmuletoPorPersonagem,
};
