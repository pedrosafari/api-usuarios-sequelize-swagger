# API de Usuários — Express + Sequelize + Swagger

Projeto acadêmico de **Programação Web II**, estruturado a partir dos materiais **Passo A Passo Sequelize** e **Passo a Passo Swagger** fornecidos em aula.

## Tecnologias

- Node.js
- Express
- Sequelize
- MySQL (`mysql2`)
- `bcryptjs`
- Swagger (`swagger-ui-express` + `swagger-jsdoc`)
- `sequelize-cli`

## Estrutura

```text
src/
├── app.js
├── server.js
├── controllers/
│   └── usuarios.controller.js
├── services/
│   └── usuarios.service.js
├── repositories/
│   └── usuarios.repository.js
├── middlewares/
│   ├── auth.js
│   ├── authorize.js
│   └── errorHandler.js
├── routes/
│   └── users.routes.js
├── docs/
│   └── swagger.js
└── database/
    ├── config/
    │   └── config.js
    ├── models/
    │   ├── index.js
    │   ├── usuario.js
    │   ├── endereco.js
    │   └── contato.js
    ├── migrations/
    └── seeders/
```

## Banco de dados

A apostila parte de um **MySQL já existente**, com as tabelas:

- `usuarios`
- `enderecos`
- `contatos`

Por isso o projeto **não usa `sequelize.sync()` para recriar as tabelas**. Os models apenas mapeiam as tabelas existentes.

A tabela `usuarios` é mapeada com:

- `id`
- `nome`
- `email`
- `senha`
- `dataNascimento`
- `rg`
- `cpf`
- `createdAt`
- `updatedAt`

Os relacionamentos são:

- `Usuario.hasMany(Endereco)`
- `Usuario.hasMany(Contato)`
- `Endereco.belongsTo(Usuario)`
- `Contato.belongsTo(Usuario)`

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env`.

No Windows CMD:

```cmd
copy .env.example .env
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Preencha no `.env` os dados fornecidos na página inicial da UC:

```env
NODE_ENV=development
DB_HOST=...
DB_PORT=3306
DB_NAME=...
DB_USER=...
DB_PASS=...
PORT=3000
```

## Executar

```bash
npm run dev
```

ou:

```bash
npm start
```

Servidor:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api-docs
```

## CRUD de Usuários

| Método | Endpoint | Acesso |
|---|---|---|
| GET | `/api/v1/users` | Livre |
| GET | `/api/v1/users/:id` | Livre |
| POST | `/api/v1/users` | `user` ou `admin` |
| PUT | `/api/v1/users/:id` | `user` ou `admin` |
| DELETE | `/api/v1/users/:id` | somente `admin` |

A apostila de Sequelize usa `/api/v1/usuarios` nos exemplos, enquanto a apostila de Swagger usa `/api/v1/users`. Para não quebrar nenhum dos dois materiais, o projeto aceita **os dois caminhos**. O Swagger documenta `/api/v1/users`, que é o caminho usado na apostila de Swagger.

## Autenticação em memória

O PDF de Sequelize exige a política de acesso, mas parte de uma autenticação em memória já existente e não fornece a implementação completa desses middlewares. Para o projeto funcionar sozinho, foi incluída uma implementação mínima com Bearer Token.

Por padrão:

```text
user-token
admin-token
```

Você pode mudar os tokens no `.env`:

```env
USER_TOKEN=user-token
ADMIN_TOKEN=admin-token
```

No Swagger, clique em **Authorize** e informe um dos tokens.

Exemplo:

```text
admin-token
```

## Exemplo de POST

```json
{
  "nome": "Ana Silva",
  "email": "ana@teste.com",
  "senha": "123456",
  "cpf": "111.222.333-44",
  "rg": "12.345.678-9",
  "dataNascimento": "1995-08-20"
}
```

A senha é armazenada com hash usando `bcryptjs` e nunca é retornada nas consultas de usuários.

## Status HTTP usados

- `200` — consulta/atualização concluída
- `201` — usuário criado
- `204` — usuário removido
- `400` — dados inválidos
- `401` — não autenticado
- `403` — sem autorização
- `404` — usuário não encontrado
- `409` — email ou CPF duplicado
- `500` — erro interno

## Observação sobre migrations

As pastas `migrations` e `seeders` estão presentes e a `.sequelizerc` aponta para `src/database`, conforme o material. Como o banco da UC já existe, não foi criada uma migration inicial para recriar as tabelas.

Comandos disponíveis para evoluções futuras:

```bash
npx sequelize-cli migration:generate --name add-coluna-exemplo
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli seed:generate --name seed-usuarios
npx sequelize-cli db:seed:all
```

## Entrega

Antes de enviar ao GitHub, confira se o arquivo `.env` **não foi commitado**. Ele já está no `.gitignore`.
