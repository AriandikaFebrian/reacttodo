import { api } from "../lib/axios";
import type { CreateTodoPayload, UpdateTodoPayload, Todo } from "../types/todo";

/**
 * Ambil semua todo dari API
 */
export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/todos?limit=10");

  // response DummyJSON ada di res.data.todos
  return res.data.todos;
};

/**
 * Ambil detail 1 todo berdasarkan ID
 */
export const getTodoById = async (id: number): Promise<Todo> => {
  const res = await api.get(`/todos/${id}`);
  return res.data;
};

/**
 * Create todo baru
 */
export const createTodo = async (payload: CreateTodoPayload): Promise<Todo> => {
  const res = await api.post("/todos/add", {
    todo: payload.todo,
    completed: payload.completed ?? false,
    userId: payload.userId ?? 1,
  });

  return res.data;
};

/**
 * Update todo berdasarkan ID
 */
export const updateTodo = async (payload: UpdateTodoPayload): Promise<Todo> => {
  const res = await api.put(`/todos/${payload.id}`, {
    todo: payload.todo,
    completed: payload.completed,
  });

  return res.data;
};

/**
 * Delete todo berdasarkan ID
 */
export const deleteTodo = async (id: number): Promise<Todo> => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};