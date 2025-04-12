const { v4: uuidv4 } = require('uuid');

// Tipos permitidos
const TIPOS_PERMITIDOS = ['Arma', 'Armadura', 'Amuleto'];

let itensMagicos = [];

function criarItemMagico(data) {
  // Verifica se os dados obrigatórios foram passados
  if (!data.nome || !data.tipo || data.forca === undefined || data.defesa === undefined) {
    throw new Error('Nome, tipo, força e defesa são obrigatórios.');
  }

  // Valida o tipo do item
  if (!TIPOS_PERMITIDOS.includes(data.tipo)) {
    throw new Error(`Tipo de item inválido! Os tipos permitidos são: ${TIPOS_PERMITIDOS.join(', ')}.`);
  }

  // Regras para atributos dependendo do tipo:
  if (data.tipo === 'Arma' && data.defesa !== 0) {
    throw new Error('Item do tipo Arma deve ter Defesa igual a 0.');
  }
  if (data.tipo === 'Armadura' && data.forca !== 0) {
    throw new Error('Item do tipo Armadura deve ter Força igual a 0.');
  }

  // Valida que pelo menos um dos atributos (força ou defesa) seja maior que zero
  if (data.forca === 0 && data.defesa === 0) {
    throw new Error('Item deve possuir valor diferente de zero em Força ou Defesa.');
  }

  // Limita os valores máximos
  if (data.forca > 10 || data.defesa > 10) {
    throw new Error('Força e Defesa do item não podem ultrapassar 10.');
  }

  // Criação do novo item
  const novoItem = {
    id: uuidv4(),
    nome: data.nome,
    tipo: data.tipo,
    forca: data.forca || 0,
    defesa: data.defesa || 0
  };

  // Adiciona o item na lista
  itensMagicos.push(novoItem);

  return novoItem;
}

function listarItensMagicos() {
  return itensMagicos;
}

function listarTotalItensMagicos() {
  return itensMagicos.length;
}

function buscarItemMagicoPorId(id) {
  const item = itensMagicos.find(item => item.id === id);
  if (!item) {
    throw new Error(`Item com ID ${id} não encontrado.`);
  }
  return item;
}

function removerItemMagico(id) {
  const index = itensMagicos.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error(`Item com ID ${id} não encontrado.`);
  }
  itensMagicos.splice(index, 1);
}

module.exports = {
  criarItemMagico,
  listarItensMagicos,
  listarTotalItensMagicos,
  buscarItemMagicoPorId,
  removerItemMagico
};
