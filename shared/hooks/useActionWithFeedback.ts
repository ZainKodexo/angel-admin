'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import type { ApiResponse } from '@/shared/types';

type Position =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

interface ToastConfig {
  duration?: number;
  position?: Position;
}

interface ToastOptions extends ToastConfig {
  successMessage?: string;
  errorMessage?: string;
}

const DEFAULT_TOAST_CONFIG: Required<ToastConfig> = {
  duration: 4000,
  position: 'top-center',
};

const showToast = (
  type: 'success' | 'error',
  message: string,
  config: ToastConfig = {},
) => {
  const options = {
    ...DEFAULT_TOAST_CONFIG,
    ...config,
    ...(type === 'error' && { important: true }),
  };

  toast[type](message, options);
};

const createErrorResponse = <R>(message: string): ApiResponse<R> => ({
  success: false,
  message,
  status: 500,
  data: null as R,
});

function useActionWithFeedback<T, R>(
  action: (data: T) => Promise<ApiResponse<R>>,
  options: ToastOptions = {},
) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (data: T): Promise<ApiResponse<R>> => {
      setIsLoading(true);

      try {
        const response = await action(data);
        const toastConfig = {
          duration: options.duration,
          position: options.position,
        };

        if (response.success) {
          showToast(
            'success',
            options.successMessage || response.message || 'Success',
            toastConfig,
          );
          return response;
        }

        showToast(
          'error',
          options.errorMessage || response.message || 'An error occurred',
          toastConfig,
        );
        return response;
      } catch (error) {
        showToast('error', 'An unexpected error occurred', {
          duration: options.duration,
          position: options.position,
        });
        return createErrorResponse<R>('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [action, options],
  );

  return {
    execute,
    isLoading,
  };
}

export { useActionWithFeedback };
