# Medical Procedures API

## Descrição

Esta é uma API RESTful robusta e escalável construída com NestJS para o gerenciamento eficiente de informações cruciais relacionadas a procedimentos médicos, profissionais de saúde (médicos) e pacientes. A API oferece funcionalidades completas de CRUD (Criar, Ler, Atualizar e Deletar) para entidades primárias, além de fornecer recursos analíticos valiosos através da geração de relatórios financeiros e de procedimentos negados.

**Observação:** Esta API foi projetada como um backend e não possui uma interface de usuário (frontend) integrada.

## Tecnologias Utilizadas

* **[NestJS](https://nestjs.com/)**: Um framework Node.js progressivo que facilita a construção de aplicações de servidor eficientes, confiáveis e escaláveis, seguindo padrões de arquitetura bem definidos.
* **[TypeScript](https://www.typescriptlang.org/)**: Uma linguagem que estende o JavaScript adicionando tipagem estática, o que melhora a segurança do código, a manutenibilidade e a experiência de desenvolvimento com tooling avançado.
* **[TypeORM](https://typeorm.io/)**: Um poderoso ORM (Object-Relational Mapper) para TypeScript e JavaScript, compatível com diversos bancos de dados relacionais, simplificando a interação com o banco de dados.
* **[PostgreSQL](https://www.postgresql.org/)**: O sistema de gerenciamento de banco de dados relacional escolhido pela sua confiabilidade, robustez e conformidade com padrões SQL (a configuração do banco de dados pode ser ajustada conforme a necessidade).
* **[Swagger](https://swagger.io/) (@nestjs/swagger)**: Uma ferramenta essencial para a documentação automática e interativa da API, permitindo que desenvolvedores e consumidores explorem e testem os endpoints diretamente através de uma interface web em `/api/docs`.
* **[Class-Validator](https://github.com/typestack/class-validator) (@nestjs/class-validator)**: Uma biblioteca de validação declarativa que utiliza decorators para definir regras de validação para os DTOs (Data Transfer Objects), garantindo a integridade dos dados de entrada.
* **[Class-Transformer](https://github.com/typestack/class-transformer) (@nestjs/class-transformer)**: Uma biblioteca para transformar objetos JavaScript/TypeScript, frequentemente usada em conjunto com o `class-validator` para converter dados de requisição em instâncias de DTOs.
* **[Biomelint](https://biomelint.org/)**: (Assumindo ser uma ferramenta ou prática para garantir a qualidade e consistência do código, focando em legibilidade e aderência a padrões).
* **[Jest](https://jestjs.io/) (@nestjs/testing)**: Um framework de testes JavaScript com foco na simplicidade e facilidade de uso, utilizado para garantir a qualidade e confiabilidade da API através de testes unitários e de integração.
* **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Uma biblioteca para realizar o hashing seguro de senhas, protegendo as credenciais dos usuários.
* **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Uma biblioteca para gerar e verificar tokens JSON Web (JWT) para autenticação e autorização seguras.
* **[Helmet](https://helmetjs.github.io/) (@nestjs/platform-express)**: Um middleware para Express que ajuda a proteger a aplicação definindo vários cabeçalhos HTTP de segurança.
* **[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (@nestjs/platform-express)**: Middleware para habilitar o Cross-Origin Resource Sharing, permitindo que diferentes domínios acessem a API de forma controlada.
* **[Rate Limiter](https://github.com/nestjs/throttler) (@nestjs/throttler)**: Um módulo para limitar o número de requisições que um cliente pode fazer dentro de um período específico, protegendo a API contra ataques de força bruta e uso excessivo.

## Funcionalidades Detalhadas

* **Gerenciamento de Procedimentos Médicos:**
    * CRUD completo para registros de procedimentos médicos, incluindo detalhes como nome, descrição, data, valor e status de pagamento.
    * Capacidade de associar procedimentos a médicos e pacientes, estabelecendo relações claras entre as entidades.
    * Registro do status de pagamento (pago, pendente, negado) e, em caso de negação, o motivo específico.
* **Gerenciamento de Médicos:**
    * CRUD completo para informações de médicos, como nome, especialidade e informações de contato.
* **Gerenciamento de Pacientes:**
    * CRUD completo para informações de pacientes, incluindo dados pessoais e informações de contato.
* **Relatórios Analíticos:**
    * **Relatório Financeiro por Médico:** Geração de relatórios detalhados que agregam o total de valores pagos, pendentes e negados para um médico específico dentro de um intervalo de datas definido.
    * **Relatório de Procedimentos Negados por Período:** Produção de listas abrangentes de todos os procedimentos que foram marcados como negados durante um período específico, auxiliando na análise de tendências e causas de negação.
* **Validação de Dados Robusta:**
    * Implementação rigorosa de validação de dados de entrada utilizando DTOs (`Data Transfer Objects`) e a biblioteca `@nestjs/class-validator`. Isso garante que apenas dados consistentes e válidos sejam processados pela API.
* **Documentação da API Interativa:**
    * Geração automática de documentação OpenAPI (Swagger) acessível através da rota `/api/docs`. Esta documentação permite a exploração interativa dos endpoints, incluindo a visualização de parâmetros, corpos de requisição e respostas esperadas, facilitando a integração e o teste da API.
* **Tratamento Consistente de Erros e Exceções:**
    * Implementação de um tratamento de erros e exceções HTTP consistente em toda a API. As respostas de erro seguem padrões bem definidos, fornecendo informações claras sobre a natureza do problema para o cliente. Exceções específicas do NestJS (como `BadRequestException`, `NotFoundException`, `UnauthorizedException`, `ForbiddenException`) são utilizadas para indicar diferentes tipos de erros.
    
    * Padrões de Resposta de Erro: Quando ocorre um erro, a API geralmente retorna uma resposta HTTP com um código de status apropriado (geralmente na faixa `4xx` para erros do cliente e `5xx` para erros do servidor) e um corpo JSON contendo detalhes sobre o erro. A estrutura típica do corpo de erro é a seguinte:

      ```json
      {
        "statusCode": 400,
        "message": "Mensagem descritiva do erro",
        "error": "Tipo do erro (opcional, mas útil)"
      }
* **Segurança Aprimorada:**
    * **Autenticação:** Implementação de um sistema de autenticação robusto utilizando tokens JSON Web (JWT). Os usuários (como médicos e administradores) precisam se autenticar para acessar rotas protegidas, garantindo que apenas usuários autorizados possam interagir com dados sensíveis.
    * **Autorização Baseada em Roles (RBAC):** O acesso a diferentes funcionalidades e recursos da API é controlado através de um sistema de autorização baseado em roles (`SUPPORT`, `DOCTOR`, `ADMIN`). Guards personalizados (`RolesGuard`) são utilizados em conjunto com decorators (`@Roles()`) para restringir o acesso a rotas com base nas roles atribuídas ao usuário autenticado.
    * **Validação de Dados:** A validação de dados de entrada através do `class-validator` ajuda a prevenir ataques de injeção e garante a integridade dos dados.
    * **Medidas Adicionais:** A API também incorpora middlewares de segurança como CORS (para controle de acesso entre origens), Helmet (para proteção contra vulnerabilidades comuns em aplicações web) e Rate Limiting (para prevenir ataques de negação de serviço e abuso).

## Princípios de Design e Boas Práticas

* **Arquitetura:** A API segue os princípios da **Clean Architecture** e **Clean Domain**, buscando a separação clara de responsabilidades entre as camadas (Domínio, Aplicação, Infraestrutura e Apresentação). O core da aplicação (entidades e casos de uso) é independente de frameworks e detalhes de implementação. A escolha desta arquitetura visa a alta testabilidade, manutenibilidade e adaptabilidade a mudanças nos requisitos de negócio.
* **Separação de Responsabilidades (SRP):** Cada módulo, serviço e classe tem uma responsabilidade bem definida, tornando o código mais coeso e fácil de manter. Por exemplo, a lógica de autenticação reside no módulo `Auth`, o acesso a dados no repositório (`TypeOrmUserRepository`), e a lógica de negócios é implementada nos **Casos de Uso**.
* **Casos de Uso (Use Cases):** A lógica de negócios da aplicação é organizada em **Casos de Uso**, que representam interações específicas do usuário com o sistema. Cada Caso de Uso encapsula uma única funcionalidade (ex: criar um procedimento médico, gerar um relatório financeiro), promovendo a clareza e a testabilidade da lógica de negócios.
* **Inversão de Dependência (DIP) e Injeção de Dependência (DI):** O NestJS promove fortemente a Injeção de Dependência, e a API foi construída injetando interfaces em vez de implementações concretas. Isso segue o princípio da Inversão de Dependência do SOLID, reduzindo o acoplamento entre os componentes e facilitando a testabilidade e a substituibilidade de implementações.
* **Princípio Aberto/Fechado (OCP):** A arquitetura modular e o uso de interfaces permitem que a API seja estendida com novas funcionalidades sem a necessidade de modificar o código existente, seguindo o Princípio Aberto/Fechado do SOLID.
* **Clean Code:** A API foi desenvolvida com foco em legibilidade, nomes significativos, funções pequenas e claras, e comentários concisos para garantir a manutenibilidade e a colaboração eficaz.
* **Design Patterns:** Diversos padrões de design foram aplicados para resolver problemas comuns de arquitetura e design, incluindo:
    * **Repository Pattern:** Para abstrair a lógica de acesso aos dados do banco de dados.
    * **Decorator Pattern:** Amplamente utilizado pelo NestJS para metadados, validação e manipulação de requisições.
    * **Guard Pattern:** Para implementar a lógica de autenticação e autorização de forma declarativa.
    * **DTO (Data Transfer Object):** Para definir a estrutura dos dados que são transferidos entre a API e os clientes, além de serem usados para validação.
* **Cobertura de Testes:** A API possui uma suíte abrangente de testes unitários e de integração, utilizando o framework Jest. Os testes cobrem as principais funcionalidades, garantindo a confiabilidade do código, facilitando a refatoração e fornecendo confiança nas entregas. A cobertura de testes pode ser verificada através de comandos como `npm run test:cov`.


## Pré-requisitos

* **[Node.js](https://nodejs.org/)** (versão >= 18)
* **[npm](https://www.npmjs.com/)** (geralmente instalado com Node.js)

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
    * Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados (host, porta, usuário, senha, nome do banco), a chave secreta do JWT (`JWT_SECRET`) e outras variáveis sensíveis. Consulte o arquivo `.env.example` para um modelo.
4.  Execute as migrations do TypeORM para criar o schema do banco de dados:
    ```bash
    npm run typeorm migration:run
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento com hot-reloading:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000` (ou na porta definida na variável `PORT` do seu arquivo `.env`). A documentação interativa da API (Swagger UI) pode ser acessada em `http://localhost:3000/api/docs`.

## Testes

Para executar a suíte completa de testes unitários e de integração:

```bash
npm run test
```

Para executar os testes e gerar o relatório de cobertura de código:

```bash
npm run test:cov
```
Os resultados da cobertura de código serão gerados em formato HTML e outros na pasta coverage na raiz do seu projeto. Abra o arquivo index.html dentro desta pasta para visualizar o relatório detalhado da cobertura.