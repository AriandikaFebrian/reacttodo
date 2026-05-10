import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

import type {
  CreateTodoPayload,
  UpdateTodoPayload,
} from "../types/todo";

/**
 * GET TODOS
 */
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

/**
 * CREATE TODO
 */
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => createTodo(payload),

    /**
     * setelah create berhasil
     * kita refresh data list
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

/**
 * UPDATE TODO
 */
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTodoPayload) => updateTodo(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

/**
 * DELETE TODO
 */
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};