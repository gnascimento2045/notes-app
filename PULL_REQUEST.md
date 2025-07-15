# Pull Request

Aplicação completa, um sistema de gerenciamento de tarefas com frontend em React e backend em Node.js, ambos em TypeScript, seguindo o design e funcionalidades solicitadas.

---

## O que foi feito

### Backend

- Configuração inicial do projeto Node.js com TypeScript.  
- Implementação do modelo `Task` com Mongoose para MongoDB, contemplando os campos: título, descrição, cor, favorito, timestamps.  
- Rotas RESTful para CRUD de tarefas:  
  - **GET** para listar tarefas (com filtros por cor e favoritos).  
  - **POST** para criar tarefa.  
  - **PUT** para atualizar tarefa.  
  - **DELETE** para remover tarefa.  
- Validação básica dos dados recebidos.  
- Estrutura de tipos TypeScript para as entidades e DTOs.  
- Tratamento de erros com respostas padronizadas.  
- Scripts no `package.json` para desenvolvimento, build e start.

### Frontend

- Projeto React com TypeScript criado via `create-react-app`.  
- Implementação das telas para:  
  - Listar tarefas com filtros dinâmicos por cor e favoritos.  
  - Formulário para criação e edição de tarefas com seletor de cor.  
- Consumo da API backend com `axios`, configurado com timeout e cabeçalhos padrão.  
- Gerenciamento de estado e dados com React Query para sincronização eficiente.  
- Layout responsivo baseado em mobile-first com SASS.  
- Tipagem consistente para dados e filtros.  
- Configuração de ESLint e Prettier para padronização do código.

---

## Como foi desenvolvido

- Estruturei o backend para expor a API REST com funcionalidades básicas para CRUD.  
- No frontend, desenvolvi a interface focada na usabilidade e responsividade.  
- Implementei filtros para facilitar a navegação.  
- Realizei testes manuais para garantir que criação, edição, remoção e filtros funcionam corretamente.  
- Mantive o foco em código limpo, organizado e tipado.

---

## Pontos importantes

- Não foram incluídos middlewares adicionais como helmet, cors, logger ou rate limiter.  
- O projeto não inclui Docker nem testes automatizados, conforme solicitado.  
- Uso completo de TypeScript para maior segurança de tipos.

---

## Como testar localmente

### Na pasta do backend:

```bash
cd backend
npm install
npm run dev

---

Frontend:

cd frontend
npm install
npm start

Abra o navegador em http://localhost:3000 para acessar a aplicação.

