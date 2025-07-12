# 📝 NOTES - Aplicação Web de Gerenciamento de Tarefas

**NOTES** é uma aplicação web fullstack para gerenciamento de tarefas com foco em produtividade e organização. Permite criar, editar, excluir e filtrar tarefas com suporte a favoritos e cores personalizadas. Possui uma interface moderna e responsiva, pensada para dispositivos móveis.

---

## ✨ Funcionalidades

- ✅ Criar, editar e excluir tarefas
- ⭐ Marcar tarefas como favoritas
- 🎨 Personalizar a cor de cada tarefa
- 🔍 Buscar tarefas por título
- 🎯 Filtrar por favoritos e por cor
- 📱 Interface responsiva (mobile-first)

---

## 🛠 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Express Validator
- Rate Limiter
- ESLint + Prettier

### Frontend
- React
- TypeScript
- Sass (SCSS)
- Axios
- ESLint + Prettier

---

## 📂 Estrutura do Projeto

```
notes-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
└── README.md
```

---

## ▶️ Como Executar Localmente

### Pré-requisitos

- Node.js v16+
- MongoDB em execução local (ou URL externa)

### Backend
```bash
cd backend
npm install
npm run dev
```

A API estará disponível em `http://localhost:3001`

### Frontend
```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:3000`

---

## 📋 Scripts

### Backend
```bash
npm run dev       # Inicia servidor em modo desenvolvimento
npm run build     # Compila código TypeScript
npm run lint      # Verifica padrões de código
npm run lint:fix  # Corrige automaticamente problemas de lint
```

### Frontend
```bash
npm start         # Inicia aplicação React
npm build         # Gera build para produção
npm run lint      # Verifica padrões de código
npm run lint:fix  # Corrige automaticamente problemas de lint
```

---

## 📱 Responsividade

A aplicação segue o padrão **mobile-first**, garantindo uma boa experiência tanto em dispositivos móveis quanto em telas maiores.

---

## 👨‍💻 Autor

**Gabriel Nascimento**