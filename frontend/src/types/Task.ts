export interface Task {
  _id: string;
  title: string;
  description: string;
  color: string;
  isFavorite: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  isFavorite?: boolean;
  color?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isFavorite?: boolean;
  color?: string;
}
