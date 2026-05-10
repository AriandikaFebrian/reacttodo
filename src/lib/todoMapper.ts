import type { Todo, DummyTodo } from "../types/todo";

/**
 * Mengubah data dari DummyJSON (raw API)
 * menjadi format Todo yang dipakai aplikasi
 *
 * Kenapa perlu ini?
 * Karena struktur API tidak selalu sesuai kebutuhan UI
 */
export const mapDummyToTodo = (dummy: DummyTodo): Todo => {
  return {
    id: dummy.id,

    // "todo" dari API kita jadikan "title" di aplikasi
    title: dummy.todo,

    // DummyJSON tidak punya description,
    // jadi kita isi default agar UI tetap konsisten
    description: "",

    // status turunan dari completed boolean
    completed: dummy.completed,
    status: dummy.completed ? "DONE" : "PENDING",

    userId: dummy.userId,

    // DummyJSON tidak menyediakan createdAt,
    // jadi kita generate saat mapping
    createdAt: new Date().toISOString(),
  };
};

/**
 * Mapping untuk array todos sekaligus
 * biar lebih clean daripada loop di UI
 */
export const mapDummyTodos = (dummies: DummyTodo[]): Todo[] => {
  return dummies.map((item) => mapDummyToTodo(item));
};