import TodoCard from "../components/TodoCard";
import { useTodos } from "../hooks/useTodos";

/**
 * Page hanya untuk orchestrate data
 */
export default function TodoPage() {
  const { data, isLoading, isError } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {data?.length === 0 && <p>No todo found</p>}

      <div className="grid gap-3">
        {data?.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
}