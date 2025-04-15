# Medical Procedures API

## Descrição

Esta é uma API RESTful construída com NestJS para gerenciar informações sobre procedimentos médicos, médicos e pacientes. A API permite criar, ler, atualizar e deletar registros, além de gerar relatórios financeiros e de procedimentos negados.

Não existe um front-end para esta API.

## Tecnologias Utilizadas

* [NestJS](https://nestjs.com/): Framework Node.js progressivo para construção de aplicações de servidor eficientes e escaláveis.
* [TypeScript](https://www.typescriptlang.org/): Superset tipado de JavaScript que oferece melhor tooling e segurança.
* [TypeORM](https://typeorm.io/): ORM para TypeScript e JavaScript que suporta diversos bancos de dados relacionais.
* [PostgreSQL](https://www.postgresql.org/): Banco de dados relacional utilizado (configurável).
* [Swagger](https://swagger.io/): Ferramenta para documentação e exploração da API.
* [Class-Validator](https://github.com/typestack/class-validator): Biblioteca para validação de dados.
* [Class-Transformer](https://github.com/typestack/class-transformer): Biblioteca para transformar objetos.
* [Biomelint](https://biomelint.org/): (Mencionado no contexto, pode ser uma ferramenta de linting específica ou uma referência a práticas de código limpo).

## Funcionalidades

* **Gerenciamento de Procedimentos Médicos:**
    * Criar, listar, buscar, atualizar e deletar procedimentos médicos.
    * Associação com médicos e pacientes.
    * Registro de data, valor e status de pagamento.
    * Registro de motivo de negação (se aplicável).
* **Gerenciamento de Médicos:**
    * Criar, listar, buscar, atualizar e deletar informações de médicos.
* **Gerenciamento de Pacientes:**
    * Criar, listar, buscar, atualizar e deletar informações de pacientes.
* **Relatórios:**
    * **Relatório Financeiro por Médico:** Gera um relatório com o total pago, pendente e negado para um médico em um período específico.
    * **Relatório de Procedimentos Negados por Período:** Gera uma lista de todos os procedimentos que foram negados dentro de um período específico.
* **Validação de Dados:**
    * Validação robusta dos dados de entrada usando DTOs e `class-validator` e.
* **Documentação da API:**
    * Documentação interativa da API gerada automaticamente com Swagger, disponível em `/api/docs`.
* **Tratamento de Erros:**
    * Tratamento consistente de erros e exceções HTTP com respostas informativas.
* **Segurança:**
    * Implementação de práticas de segurança como autenticação, autorização e validação de dados. 
    * Outras medidas como CORS, Helmet, Rate Limiting também foram implementadas.
* **Inversão de Dependência (SOLID):**
    * Adoção do princípio da Inversão de Dependência (DIP) do SOLID, injetando interfaces em vez de implementações concretas para promover o desacoplamento e a testabilidade.

## Pré-requisitos

* [Node.js](https://nodejs.org/) (versão >= 18)
* [npm](https://www.npmjs.com/) (geralmente instalado com Node.js)


## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/lucsbasto/medical-procedures-api
    cd medical-procedures-api
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    * Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados e outras variáveis sensíveis. Consulte o arquivo `.env.example` para um modelo.

4.  Execute as migrations do TypeORM para criar o schema do banco de dados:
    ```bash
    npm run typeorm migration:run
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev