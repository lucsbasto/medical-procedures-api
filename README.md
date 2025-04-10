🏥 Medical Procedures API
==========================

API RESTful desenvolvida com **NestJS** para gerenciar procedimentos médicos, previsões de pagamento e relatórios de glosas.
Inclui endpoints para cadastro de procedimentos, geração de relatórios por médico e controle de status de pagamento.

🔧 Tecnologias utilizadas
--------------------------
- NestJS
- TypeScript
- TypeORM (com suporte a SQLite ou PostgreSQL)
- Swagger (Documentação automática)
- Class-validator / Class-transformer
- JWT Authentication (opcional)

📦 Instalação
--------------
$ git clone https://github.com/lucsbasto/medical-procedures-api.git
$ cd medical-procedures-api
$ npm install
$ npm run start:dev

⚙️ Configuração
----------------
Crie um arquivo .env na raiz do projeto:

DATABASE_URL=sqlite://:memory:
JWT_SECRET=super-secret

🚀 Endpoints disponíveis
------------------------

✅ Cadastro de procedimento médico
POST /procedures

Body:
{
  "doctorId": 1,
  "patientId": 2,
  "procedureDate": "2025-04-10",
  "amount": 350.00,
  "paymentStatus": "pendente"
}

📅 Relatório diário por médico
GET /reports/daily/2025-04-10

🧾 Relatório de glosas por período
GET /reports/glosas?start=2025-04-01&end=2025-04-10

💰 Relatório financeiro por médico
GET /reports/finance

🔐 Segurança
-------------
- Validação de entrada com class-validator
- Sanitização e verificação de campos obrigatórios
- CORS habilitado
- Tratamento global de erros
- Autenticação JWT (opcional)

📘 Documentação Swagger
------------------------
http://localhost:3000/api

Inclui:
- Modelos de dados
- Exemplos de request/response
- Autorização com Bearer Token

❌ Tratamento de erros
----------------------
Exemplo de erro:
{
  "statusCode": 404,
  "message": "Procedimento não encontrado",
  "error": "Not Found"
}

📂 Estrutura do projeto
------------------------
src/
├── procedures/
│   ├── procedure.controller.ts
│   ├── procedure.service.ts
│   ├── procedure.entity.ts
│   └── dto/
├── reports/
│   ├── reports.controller.ts
│   └── reports.service.ts
├── common/
│   ├── filters/
│   └── interceptors/
└── main.ts

🧑‍💻 Autor
-----------
Lucas Bastos
linkedin.com/in/lucsbasto
github.com/lucsbasto

📝 Licença
-----------
Este projeto está sob a licença MIT.