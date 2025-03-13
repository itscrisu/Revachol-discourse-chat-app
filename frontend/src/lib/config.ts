export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export function apiUrl(endpoint: string): string {
  if (endpoint.startsWith('/') && API_BASE_URL.endsWith('/')) {
    endpoint = endpoint.substring(1);
  }
  
  if (!API_BASE_URL.endsWith('/') && !endpoint.startsWith('/')) {
    return `${API_BASE_URL}/${endpoint}`;
  }
  
  return `${API_BASE_URL}${endpoint}`;
} 