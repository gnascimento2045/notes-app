import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/Task';
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
export const taskService = {
  async getAllTasks(params?: {
    search?: string;
    favorite?: boolean;
    color?: string;
  }): Promise<Task[]> {
    const response = await api.get('/tasks', { params });
    return response.data;
  },
  async createTask(task: CreateTaskRequest): Promise<Task> {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  async updateTask(id: string, task: UpdateTaskRequest): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async toggleFavoriteTask(id: string, isFavorite: boolean): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, { isFavorite });
    return response.data;
  },
};
