// Base URL for the Express backend. Vite only exposes env vars prefixed with
// VITE_, and they must come from a .env file at the project root (see
// frontend .env.example in this folder).
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
