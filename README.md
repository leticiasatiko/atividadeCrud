# Trabalho CRUD - RPG

## 📦 Instalação
#### git clone https://github.com/leticiasatiko/atividadeCrud.git
#### npm install

## ▶️ Execução
#### node index.js

## 📚 Documentação Swagger
#### http://localhost:3000/api-docs

## 📁 Endpoints
### Personagem
- `POST /personagens` - Cria um novo personagem.
- `GET /personagens` - Retorna todos os personagens.
- `GET /personagens/:id` - Exibe os dados de um personagem específico.
- `DELETE /personagens/:id` - Remove um personagem pelo ID.
- `POST /personagens/:id/:itemId` - Atribui um item mágico ao personagem.

{
  "nome": "Fulano",
  "nomeAventureiro": "Fulaninho",
  "classe": "Guerreiro",
  "level": 1,
  "forca": 6,
  "defesa": 4
}

### Item
- `POST /itens` - Cria um novo item mágico.
- `GET /itens` - Retorna todos os itens mágicos.
- `GET /itens/total` - Retorna a quantidade total de itens mágicos cadastrados.

{
  "nome": "Espada Flamejante",
  "tipo": "Arma",
  "forca": 7,
  "defesa": 0
}



#### 🔍 Buscar Item por ID
GET /itens/:id - Exibe um item mágico específico.

#### ❌ Remover Item
DELETE /itens/:id - Remove um item mágico pelo ID.

