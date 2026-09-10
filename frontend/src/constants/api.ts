// API endpoint constants
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  TOURS: \\/tours\,
  AUTH: \\/auth\,
  USERS: \\/users\,
  DESTINATIONS: \\/destinations\,
  REVIEWS: \\/reviews\,
} as const;
