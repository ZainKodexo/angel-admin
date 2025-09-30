import { ApiException, ApiResponse } from '@/shared/types';

type MiddlewareFunction = (
  context: RequestContext,
  next: () => Promise<ApiResponse<unknown>>,
) => Promise<ApiResponse<unknown>>;

interface RequestContext {
  method: string;
  endpoint: string;
  options?: RequestOptions;
  retryCount?: number;
}

interface RequestOptions {
  body?: Record<string, unknown> | FormData;
  multipart?: boolean;
  signal?: AbortSignal;
  skipRetry?: boolean;
  skipCache?: boolean;
}

class ApiMiddlewareChain {
  private middlewares: MiddlewareFunction[] = [];

  use(middleware: MiddlewareFunction) {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(
    context: RequestContext,
    handler: () => Promise<ApiResponse<unknown>>,
  ) {
    let index = 0;

    const next = async (): Promise<ApiResponse<unknown>> => {
      if (index < this.middlewares.length) {
        return this?.middlewares?.[index++]?.(context, next)!;
      }
      return handler();
    };

    return next();
  }
}

const retryMiddleware: MiddlewareFunction = async (context, next) => {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second

  try {
    return await next();
  } catch (error) {
    if (
      error instanceof ApiException &&
      [408, 429, 500, 502, 503, 504].includes(error.status) &&
      !context.options?.skipRetry
    ) {
      const retryCount = (context.retryCount || 0) + 1;
      if (retryCount <= maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount - 1); // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));

        return await next();
      }
    }
    throw error;
  }
};

export { ApiMiddlewareChain, retryMiddleware };
