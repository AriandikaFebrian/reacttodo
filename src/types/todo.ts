export type TodoStatus = "DONE" | "PENDING";

/**
 * Model utama yang dipakai di seluruh aplikasi (UI Layer)
 * Ini BUKAN bentuk asli API, tapi hasil mapping
 */
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: TodoStatus;
  userId?: number;
  createdAt: string;
}

/**
 * Payload untuk create todo (digunakan di form + API)
 */
export interface CreateTodoPayload {
  title: string;
  description: string;
  completed?: boolean;
  userId?: number;
}

/**
 * Payload untuk update todo
 */
export interface UpdateTodoPayload {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TodoStatus;
}

/**
 * Raw response dari DummyJSON (API mentah)
 */
export interface DummyTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

/**
 * Response list todos dari API
 */
export interface TodosResponse {
  todos: DummyTodo[];
  total: number;
  skip: number;
  limit: number;
}