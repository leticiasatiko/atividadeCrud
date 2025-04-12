📦 Instalação
bash
Copy
Edit
git clone https://github.com/seu-usuario/rpg-manager-api.git
cd rpg-manager-api
npm install
▶️ Execução
bash
Copy
Edit
npm start
A API será iniciada em:
http://localhost:3000

📚 Documentação Swagger
Acesse em:
http://localhost:3000/api-docs

📁 Endpoints
🔹 Personagens
➕ Criar Personagem
POST /personagens
Cria um novo personagem.

json
Copy
Edit
{
  "nome": "Fulano",
  "nomeAventureiro": "Fulano, o Bravo",
  "classe": "Guerreiro",
  "level": 1,
  "forca": 6,
  "defesa": 4
}
📃 Listar Personagens
GET /personagens
Retorna todos os personagens.

🔍 Buscar Personagem por ID
GET /personagens/:id
Exibe os dados de um personagem específico.

❌ Remover Personagem
DELETE /personagens/:id
Remove um personagem pelo ID.

🪄 Atribuir Item Mágico
POST /personagens/:id/atribuir-item/:itemId
Atribui um item mágico ao personagem.

Regra importante:
Se o item for um Amuleto, o personagem só poderá ter esse item. Nenhum outro item pode ser atribuído.

🔹 Itens Mágicos
➕ Criar Item Mágico
POST /itens
Cria um novo item mágico.

json
Copy
Edit
{
  "nome": "Espada Flamejante",
  "tipo": "Arma",
  "forca": 7,
  "defesa": 0
}
Tipos permitidos: "Arma", "Armadura", "Amuleto"

📃 Listar Itens
GET /itens
Retorna todos os itens mágicos.

🔢 Total de Itens
GET /itens/total
Retorna a quantidade total de itens mágicos cadastrados.

🔍 Buscar Item por ID
GET /itens/:id
Exibe um item mágico específico.

❌ Remover Item
DELETE /itens/:id
Remove um item mágico pelo ID.

