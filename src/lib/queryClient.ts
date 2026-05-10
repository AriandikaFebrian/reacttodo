import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient ini digunakan sebagai cache manager
 * untuk semua data dari API (GET, POST, PUT, DELETE)
 */
export const queryClient = new QueryClient();