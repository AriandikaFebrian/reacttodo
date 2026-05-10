import axios from "axios";

/**
 * Axios instance digunakan untuk semua request API
 * Base URL diarahkan ke DummyJSON agar mudah maintenance
 */
export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});