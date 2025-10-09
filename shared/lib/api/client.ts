import type {
  ApiResponse,
  RequestOptions,
  RequestContext,
  ApiError,
} from '@/shared/types';
import { ApiException } from '@/shared/types';
import { withErrorHandling } from './decorators';
import { ApiMiddlewareChain, retryMiddleware } from './middleware';
import { API_CONFIG, IAuthService, ICookieService } from '@/shared/lib';
import { captureErrorMessage } from '@/events/SentryErrorHandler';
import { AuthService, NextCookieService } from '../services';

class ApiClient {
  private static instance: ApiClient;
  private middlewareChain: ApiMiddlewareChain;
  private cookieService: ICookieService;
  private authService: IAuthService;

  private constructor() {
    this.cookieService = NextCookieService;
    this.authService = AuthService;
    this.middlewareChain = new ApiMiddlewareChain();

    this.middlewareChain.use(retryMiddleware);
  }

  static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  private async getHeaders(multipart = false): Promise<Headers> {
    const token = await this.cookieService.getCookie('access_token');

    const headers = new Headers({
      ...API_CONFIG.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(multipart && { 'Content-Type': 'multipart/form-data' }),
    });

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    await this.authService.handleAuthResponse(response);

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      let error: ApiError;

      try {
        if (contentType?.includes('application/json')) {
          error = await response.json();
        } else {
          error = {
            status: response.status,
            message: response.statusText || 'Unknown error occurred',
          };
        }
      } catch {
        error = {
          status: response.status,
          message: 'Failed to parse error response',
        };
      }

      if (response.status === 500) {
        captureErrorMessage(`API_ERROR: ${JSON.stringify(error)}`);
      }

      throw new ApiException(error, response.status);
    }

    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return {
        data: data?.data,
        status: response.status,
        message: data?.message || 'Success',
        success: true,
      } as ApiResponse<T>; // Explicit type assertion here
    }

    return {
      data: {} as T,
      status: response.status,
      message: 'Success',
      success: true,
    };
  }

  @withErrorHandling()
  async request<T>(
    method: string,
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const context: RequestContext = {
      method,
      endpoint,
      options,
      cacheConfig: {
        tags: options.tags,
        revalidate: options.revalidate,
        path: options.path,
      },
    };

    const executeRequest = async () => {
      const headers = await this.getHeaders(options.multipart);
      const url = new URL(API_CONFIG.baseUrl + endpoint);
      const response = await fetch(url.toString(), {
        method,
        headers,
        body:
          options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body),
        credentials: 'include',
        signal: options.signal,
        next: context.cacheConfig
          ? {
              revalidate: context.cacheConfig.revalidate,
              tags: context.cacheConfig.tags,
            }
          : undefined,
      });

      if (response.status === 401) {
        try {
          await this.authService.refreshTokens();
          const newHeaders = await this.getHeaders(options.multipart);
          const retryResponse = await fetch(url.toString(), {
            method,
            headers: newHeaders,
            body:
              options.body instanceof FormData
                ? options.body
                : JSON.stringify(options.body),
            credentials: 'include',
            signal: options.signal,
            next: context.cacheConfig
              ? {
                  revalidate: context.cacheConfig.revalidate,
                  tags: context.cacheConfig.tags,
                }
              : undefined,
          });

          return this.handleResponse<T>(retryResponse);
        } catch (error) {
          throw new ApiException(
            {
              status: 401,
              message: 'Authentication failed',
            },
            401,
          );
        }
      }

      return this.handleResponse<T>(response);
    };

    const result = await this.middlewareChain.execute(context, executeRequest);
    return result as ApiResponse<T>;
  }

  async get<T>(
    endpoint: string,
    signal?: AbortSignal,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { signal });
  }

  async post<T>(
    endpoint: string,
    data?: Record<string, unknown>,
    multipart = false,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body: data, multipart });
  }

  async put<T>(
    endpoint: string,
    data?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body: data });
  }

  async patch<T>(
    endpoint: string,
    data?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { body: data });
  }

  async destroy<T>(
    endpoint: string,
    data?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, { body: data });
  }
}

const api = ApiClient.getInstance();

export { api };
