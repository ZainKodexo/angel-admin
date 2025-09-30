const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
} as const;

export { API_CONFIG };
