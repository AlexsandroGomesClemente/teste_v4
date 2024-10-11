# Open Food Facts API Integration

Este é um projeto que realiza a integração e importação de dados de alimentos da base do Open Food Facts, implementando uma API REST com as melhores práticas de desenvolvimento utilizando Node.js, MongoDB, e conceitos de SOLID e DDD.

## Tecnologias Utilizadas

- **Linguagem:** JavaScript/TypeScript
- **Backend Framework:** Node.js (Express)
- **Banco de Dados:** MongoDB (utilizando Mongoose como ODM)
- **Gerenciamento de Dependências:** npm
- **Bibliotecas de Terceiros:**
  - Axios (para requisições HTTP)
  - Zlib (para descompressão de arquivos .gz)
  - Node-cron (para agendamento de tarefas)
  - Dotenv (para variáveis de ambiente)

## Descrição do Projeto

Esta aplicação foi desenvolvida para importar dados de produtos da base de dados do Open Food Facts, armazenando-os em um banco de dados MongoDB. O projeto conta com uma API RESTful que permite listar, atualizar, deletar e visualizar os produtos importados. Um processo automatizado de CRON realiza a importação e atualização dos produtos diariamente, limitando a 100 produtos por arquivo.

## Funcionalidades Principais

- **CRUD de Produtos:**

  - `GET /products`: Listar todos os produtos com paginação.
  - `GET /products/:code`: Obter detalhes de um produto específico.
  - `PUT /products/:code`: Atualizar os detalhes de um produto.
  - `DELETE /products/:code`: Mudar o status do produto para "trash".

- **Cron de Importação:**
  - Realiza a importação de novos produtos diariamente, descompactando os arquivos .gz disponibilizados pelo Open Food Facts.

## Como Instalar e Usar o Projeto

### Pré-requisitos:

- **Node.js**: versão 14 ou superior
- **MongoDB**: Local ou MongoDB Atlas
- **npm**: Gerenciador de pacotes

### Passo a Passo:

1. Clone o repositório para o seu ambiente local:

   ```bash
   git clone https://github.com/seu-usuario/open-food-facts-api.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd open-food-facts-api
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Crie um arquivo .env com as variáveis de ambiente necessárias:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/openfood
   PORT=3000
   ```

5. Execute a aplicação em modo de desenvolvimento:

   ```bash
   npm run dev

   ```

6. Para rodar a aplicação em produção, utilize:

   ```bash
   npm start
   ```

### Agendamento de Importação

O processo de importação dos dados ocorre automaticamente uma vez ao dia, configurado no arquivo de cron. Se necessário, o horário pode ser ajustado nas configurações da aplicação.

### Agendamento de Importação

Para executar os testes unitários do projeto, utilize o comando:

```bash
npm run test
```

### Exemplos de Endpoints

- **Lista produtos:**

  - GET /products

  - **Obter produto por código:**
  - GET /products/:code

- **Atualizar produto:**

  - PUT /products/:code

- **Deletar produto (soft delete):**
  - DELETE /products/:code

### CHALLANGE

This is a challenge by Coodesh
