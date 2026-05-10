import { useState } from "react";
import TodoCard from "../components/TodoCard";

import { useTodos, useCreateTodo, useDeleteTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";

/**
 * Halaman utama Todo
 * sekarang sudah ada CRUD logic
 */
export default function TodoPage() {
  const { data, isLoading, isError } = useTodos();

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  const [title, setTitle] = useState("");

  /**
   * handle create todo
   */
  const handleCreate = () => {
    if (!title.trim()) return;

    createTodo.mutate({
      title,
      description: "",
    });

    setTitle("");
  };

  /**
   * handle delete todo
   */
  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* CREATE TODO FORM */}
      <div className="flex gap-2 mb-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        {data?.map((todo: Todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={() => {}}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}