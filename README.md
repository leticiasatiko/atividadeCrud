# Trabalho CRUD - RPG

## 📦 Instalação
#### git clone 
#### npm install

## ▶️ Execução
#### npm start

## 📚 Documentação Swagger
#### http://localhost:3000/api-docs

## 📁 Endpoints
### 🔹 Personagens
#### ➕ Criar Personagem
POST /personagens - Cria um novo personagem.

{
  "nome": "Fulano",
  "nomeAventureiro": "Fulaninho",
  "classe": "Guerreiro",
  "level": 1,
  "forca": 6,
  "defesa": 4
}

#### 📃 Listar Personagens
GET /personagens - Retorna todos os personagens.

#### 🔍 Buscar Personagem por ID
GET /personagens/:id - Exibe os dados de um personagem específico.

#### ❌ Remover Personagem
DELETE /personagens/:id - Remove um personagem pelo ID.

#### 🪄 Atribuir Item Mágico
POST /personagens/:id/atribuir-item/:itemId - Atribui um item mágico ao personagem.

### 🔹 Itens Mágicos
#### ➕ Criar Item Mágico
POST /itens - Cria um novo item mágico.

{
  "nome": "Espada Flamejante",
  "tipo": "Arma",
  "forca": 7,
  "defesa": 0
}

#### 📃 Listar Itens
GET /itens - Retorna todos os itens mágicos.

#### 🔢 Total de Itens
GET /itens/total - Retorna a quantidade total de itens mágicos cadastrados.

#### 🔍 Buscar Item por ID
GET /itens/:id - Exibe um item mágico específico.

#### ❌ Remover Item
DELETE /itens/:id - Remove um item mágico pelo ID.

