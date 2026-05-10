import { useState } from "react";
import TodoCard from "../components/TodoCard";

import { 
  useTodos, 
  useCreateTodo, 
  useDeleteTodo 
} from "../hooks/useTodos";

import type { Todo } from "../types/todo";
import { useDebounce } from "../hooks/useDebounce";

/**
 * Halaman utama Todo List dengan Search + Filter
 */
export default function TodoPage() {
  const { data, isLoading, isError } = useTodos();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  // State untuk Search & Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "DONE" | "PENDING">("ALL");
  const [title, setTitle] = useState("");

  // Debounce search
  const debouncedSearch = useDebounce(search, 300);

  /**
   * Filter + Search Logic
   */
  const filteredTodos = data?.filter((todo: Todo) => {
    const matchSearch = todo.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchFilter =
      filter === "ALL"
        ? true
        : filter === "DONE"
        ? todo.status === "DONE"
        : todo.status === "PENDING";

    return matchSearch && matchFilter;
  }) || [];

  /**
   * Handle Create Todo
   */
  const handleCreate = () => {
    if (!title.trim()) return;

    createTodo.mutate({
      title: title.trim(),
      description: "",
    });

    setTitle("");
  };

  /**
   * Handle Delete Todo
   */
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus todo ini?")) {
      deleteTodo.mutate(id);
    }
  };

  /**
   * Handle Edit (Simple Prompt - sementara)
   */
  const handleEdit = (todo: Todo) => {
    const newTitle = prompt("Edit todo title:", todo.title);
    if (!newTitle || newTitle.trim() === "") return;

    // TODO: Nanti panggil useUpdateTodo
    alert("Update feature akan ditambahkan di step berikutnya");
  };

  if (isLoading) return <p className="p-5 text-center">Loading todos...</p>;
  if (isError) return <p className="p-5 text-red-600 text-center">Failed to load todos</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      {/* CREATE FORM */}
      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan todo baru..."
          className="border border-gray-300 p-3 rounded-xl flex-1 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleCreate}
          disabled={createTodo.isPending}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 rounded-xl font-medium transition"
        >
          {createTodo.isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {/* SEARCH INPUT */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todo..."
        className="border border-gray-300 p-3 rounded-xl w-full mb-4 focus:outline-none focus:border-blue-500"
      />

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "DONE", "PENDING"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              filter === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* TODO LIST */}
      <div className="grid gap-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            {search || filter !== "ALL" 
              ? "No todos found 😴" 
              : "Belum ada todo. Tambahkan yang baru!"}
          </div>
        ) : (
          filteredTodos.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}