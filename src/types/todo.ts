export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

/**
 * Payload untuk create todo
 */
export interface CreateTodoPayload {
  todo: string;
  completed?: boolean;
  userId?: number;
}

/**
 * Payload untuk update todo
 */
export interface UpdateTodoPayload {
  id: number;
  todo?: string;
  completed?: boolean;
}