import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDatabase } from "./utils/database";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança e análise
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Limite de requisições para evitar abuso (rate limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
});
app.use(limiter);

// Rotas da API
app.use("/api/tasks", taskRoutes);

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware para tratamento de erros genéricos
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
);

// Inicializa a conexão com banco e servidor
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();
