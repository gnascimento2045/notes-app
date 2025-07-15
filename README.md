📝 NOTES - Aplicativo Web para Gerenciamento de Tarefas

NOTES é uma aplicação fullstack feita para ajudar no controle das suas tarefas diárias, focando em facilitar a organização e aumentar a produtividade. Com ela, você pode criar, , apagar e filtrar suas tarefas, além de marcar as mais importantes como favoritas e escolher cores para deixar tudo com a sua cara. A interface é moderna e funciona bem tanto no desktop quanto no celular.

✨ O que o app oferece

Criar,  e apagar tarefas com facilidade

Marcar tarefas favoritas para acesso rápido

Escolher cores diferentes para identificar melhor cada tarefa

Buscar tarefas pelo título

Filtrar tarefas por favoritos ou pela cor escolhida

Layout pensado para funcionar bem em qualquer dispositivo, principalmente celular

🛠 Tecnologias usadas

Backend
Node.js

Express

TypeScript

MongoDB

Mongoose

Express Validator

Rate Limiter (limitação de requisições)

ESLint + Prettier para manter o código organizado

Frontend
React

TypeScript

Sass (SCSS) para estilos

Axios para comunicação com o backend

ESLint + Prettier

📂 Como está organizado o projeto
notes-app/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── types/
│ │ └── utils/
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── types/
│ │ ├── styles/
│ │ └── utils/
│ ├── App.tsx
│ └── package.json
└── README.md

▶️ Como rodar o projeto no seu computador
O que precisa ter instalado
Node.js versão 16 ou superior

MongoDB rodando localmente ou uma URL de banco de dados MongoDB acessível

Rodando o backend

cd backend
npm install
npm run dev
Rodando o frontend

cd frontend
npm install
npm start
Depois disso, acesse o app no navegador pelo endereço: http://localhost:3000

👨‍💻 Feito por Gabriel Nascimento