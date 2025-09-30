'use client';

import { captureErrorMessage } from '@/events/SentryErrorHandler';
import { BaseError } from './BaseError';
import { useEffect } from 'react';

interface RuntimeExceptionProps {
  error: Error;
  reset: () => void;
}

const RuntimeException = ({ error, reset }: RuntimeExceptionProps) => {
  useEffect(() => {
    captureErrorMessage(`RUNTIME_EXCEPTION: ${error?.message}`);
  }, [error]);

  return (
    <BaseError
      title="OOPS!"
      subtitle="Something went wrong"
      description="Click 'Try Again' to retry or return to the homepage for a fresh start"
      textButton="Try Again"
      onClick={reset}
    />
  );
};

export { RuntimeException };
