import { api } from "../lib/axios";
import type {
  CreateTodoPayload,
  UpdateTodoPayload,
  Todo,
  DummyTodo,
} from "../types/todo";

import { mapDummyTodos, mapDummyToTodo } from "../lib/todoMapper";

/**
 * Ambil semua todo dari API
 * lalu diubah ke domain model aplikasi
 */
export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/todos?limit=10");

  const raw: DummyTodo[] = res.data.todos;

  // mapping penting supaya UI tidak tergantung API
  return mapDummyTodos(raw);
};

/**
 * Ambil 1 todo berdasarkan ID
 */
export const getTodoById = async (id: number): Promise<Todo> => {
  const res = await api.get(`/todos/${id}`);

  // tetap di-map supaya konsisten dengan domain model
  return mapDummyToTodo(res.data);
};

/**
 * Create todo baru
 */
export const createTodo = async (
  payload: CreateTodoPayload
): Promise<Todo> => {
  const res = await api.post("/todos/add", {
    todo: payload.title,
    completed: payload.completed ?? false,
    userId: payload.userId ?? 1,
  });

  // response API tetap kita normalisasi
  return mapDummyToTodo(res.data);
};

/**
 * Update todo
 */
export const updateTodo = async (
  payload: UpdateTodoPayload
): Promise<Todo> => {
  const res = await api.put(`/todos/${payload.id}`, {
    todo: payload.title,
    completed: payload.completed,
  });

  return mapDummyToTodo(res.data);
};

/**
 * Delete todo
 * API hanya return confirmation object
 */
export const deleteTodo = async (id: number): Promise<Todo> => {
  const res = await api.delete(`/todos/${id}`);

  // DummyJSON return object, kita mapping minimal
  return mapDummyToTodo(res.data);
};