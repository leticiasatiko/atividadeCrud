const { personagens } = require('./personagemModel');
const { v4: uuidv4 } = require('uuid');

const TIPOS_VALIDOS = ['Arma', 'Escudo', 'Amuleto'];

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

module.exports = { adicionarItem };
