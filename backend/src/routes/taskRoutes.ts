import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { body } from "express-validator";

const router = Router();
const taskController = new TaskController();

// Validações
const createTaskValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Título é obrigatório"),
  body("description")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Descrição é obrigatória"),
  body("color")
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage("Cor inválida"),
];

// Rotas
router.get("/", taskController.getAllTasks);
router.post("/", createTaskValidation, taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
