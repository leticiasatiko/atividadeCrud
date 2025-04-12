const { v4: uuidv4 } = require('uuid');

// Banco de dados em memória
const personagens = [];
const itens = [];

const CLASSES_VALIDAS = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];
const TIPOS_VALIDOS = ['Amuleto', 'Arma', 'Armadura'];

// Função para criar personagem
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
    forca,
    defesa,
    itens: []  // Inicializa a lista de itens do personagem
  };

  personagens.push(novoPersonagem);
  return novoPersonagem;
}

// Função para listar todos os personagens com a soma de atributos de itens
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

// Função para buscar personagem por ID
function buscarPorId(id) {
  return personagens.find(p => p.id === id);
}

// Função para adicionar item ao personagem
function adicionarItemAoPersonagem(personagemId, itemData) {
  const personagem = buscarPorId(personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado');
  }

  if (!TIPOS_VALIDOS.includes(itemData.tipo)) {
    throw new Error('Tipo de item inválido');
  }

  // Garantir que as armas não tenham defesa
  if (itemData.tipo === 'Arma') {
    itemData.defesa = 0; 
  }

  // Verificar se o personagem já tem um amuleto
  if (itemData.tipo === 'Amuleto') {
    const jaTemAmuleto = personagem.itens.some(i => i.tipo === 'Amuleto');
    if (jaTemAmuleto) {
      throw new Error('O personagem já possui um amuleto');
    }
  }

  // Criando o novo item
  const novoItem = {
    id: uuidv4(),
    nome: itemData.nome,
    tipo: itemData.tipo,
    forca: itemData.forca || 0,
    defesa: itemData.defesa || 0
  };

  personagem.itens.push(novoItem);
  return novoItem;
}

// Função para listar itens
function listarItens() {
  return itens;
}

// Função para buscar item por ID
function buscarItemPorId(id) {
  return itens.find(item => item.id === id);
}

module.exports = {
  personagens,
  criarPersonagem,
  listarPersonagens,
  adicionarItemAoPersonagem,
  listarItens,
  buscarItemPorId
};
