'use client';
import type { ApiResponse } from '@/shared/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

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

interface ActionWithFeedbackProps<T, R>
  extends UseMutationOptions<ApiResponse<R>, Error, T> {
  onSuccess?: () => void;
  onError?: (error: Error, variables: T, context: unknown) => void;
  successToast?: boolean;
}

function useActionWithFeedbackAsync<T, R>({
  onSuccess,
  onError,
  successToast = true,
  ...mutationOptions
}: ActionWithFeedbackProps<T, R>) {
  const { mutateAsync, isPending } = useMutation({
    onSuccess: (data: ApiResponse<R>, _variables: T, _context: unknown) => {
      if (data.success) {
        if (successToast) {
          showToast('success', data.message || 'Success');
        }
        onSuccess?.();
        return data;
      }
      showToast('error', data.message || 'An error occurred');
      return data;
    },
    onError: (error: Error, variables: T, context: unknown) => {
      showToast('error', error.message || 'An unexpected error occurred');
      onError?.(error, variables, context);
      return createErrorResponse<R>('An unexpected error occurred');
    },
    ...mutationOptions,
  });

  return {
    mutateAsync,
    isPending,
  };
}

export { useActionWithFeedbackAsync };
