const { v4: uuidv4 } = require('uuid');

const personagens = [];

const CLASSES_VALIDAS = ['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'];
const TIPOS_VALIDOS = ['Amuleto', 'Arma', 'Armadura'];

function criarPersonagem({ nome, nomeAventureiro, classe, level, forca, defesa, itensMagicos = [] }) {
  if (!CLASSES_VALIDAS.includes(classe)) {
    throw new Error('Classe inválida.');
  }

  if ((forca + defesa) > 10) {
    throw new Error('A soma de Força e Defesa deve ser no máximo 10.');
  }

  const amuletos = itensMagicos.filter(item => item.tipo === 'Amuleto');
  if (amuletos.length > 1) {
    throw new Error('O personagem só pode ter 1 amuleto.');
  }

  const novoPersonagem = {
    id: uuidv4(),
    nome,
    nomeAventureiro,
    classe,
    level,
    forca,
    defesa,
    itensMagicos,
  };

  personagens.push(novoPersonagem);
  return novoPersonagem;
}

function listarPersonagens() {
  return personagens;
}

function buscarPorId(id) {
  return personagens.find(p => p.id === id);
}

function adicionarItemAoPersonagem(personagemId, item) {
  const personagem = buscarPorId(personagemId);
  if (!personagem) {
    throw new Error('Personagem não encontrado.');
  }

  if (!TIPOS_VALIDOS.includes(item.tipo)) {
    throw new Error('Tipo de item inválido.');
  }

  if (item.tipo === 'Arma' && item.defesa !== 0) {
    throw new Error('Itens do tipo Arma devem ter defesa igual a 0.');
  }

  if (item.tipo === 'Amuleto') {
    const jaTemAmuleto = personagem.itensMagicos.some(i => i.tipo === 'Amuleto');
    if (jaTemAmuleto) {
      throw new Error('O personagem já possui um amuleto.');
    }
  }

  const novoItem = { id: uuidv4(), ...item };
  personagem.itensMagicos.push(novoItem);
  return novoItem;
}

module.exports = {
  criarPersonagem,
  listarPersonagens,
  buscarPorId,
  adicionarItemAoPersonagem,
};
