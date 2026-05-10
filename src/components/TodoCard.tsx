import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

/**
 * Komponen card untuk menampilkan 1 todo item
 *
 * Fokus hanya ke UI, tidak ada logic API di sini
 * agar reusable dan mudah di-maintain
 */
export default function TodoCard({ todo, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      {/* title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {todo.title}
      </h3>

      {/* status + date */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            todo.status === "DONE"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {todo.status}
        </span>

        <small className="text-gray-500">
          {new Date(todo.createdAt).toLocaleDateString("id-ID")}
        </small>
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(todo)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}