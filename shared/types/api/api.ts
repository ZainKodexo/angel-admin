interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

interface RequestOptions {
  body?: Record<string, unknown> | FormData;
  multipart?: boolean;
  signal?: AbortSignal;
  skipRetry?: boolean;
  skipCache?: boolean;
  tags?: string[];
  revalidate?: number | false;
  path?: string;
}

interface RequestContext {
  method: string;
  endpoint: string;
  options?: RequestOptions;
  retryCount?: number;
  cacheConfig?: {
    tags?: string[];
    revalidate?: number | false;
    path?: string;
  };
}

class ApiException extends Error {
  constructor(
    public readonly error: ApiError,
    public readonly status: number,
  ) {
    super(error.message);
    this.name = 'ApiException';
  }
}

export type { ApiResponse, ApiError, RequestContext, RequestOptions };

export { ApiException };
