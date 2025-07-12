import { Request, Response } from "express";
import Task from "../models/Task";
import { validationResult } from "express-validator";

export class TaskController {
  // Listar todas as tarefas
  async getAllTasks(req: Request, res: Response) {
    try {
      const { search, favorite, color } = req.query;
      let query: any = {};

      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
      if (favorite === "true") {
        query.isFavorite = true;
      }
      if (color) {
        query.color = color;
      }

      const tasks = await Task.find(query).sort({
        isFavorite: -1,
        createdAt: -1,
      });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
  }

  // Criar nova tarefa
  async createTask(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  }

  // Atualizar tarefa
  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  }

  // Excluir tarefa
  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);

      if (!task) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      res.json({ message: "Tarefa excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir tarefa" });
    }
  }
}
