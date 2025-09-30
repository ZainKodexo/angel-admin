'use client';
import * as Sentry from '@sentry/nextjs';

const captureException = (
  error: unknown,
  msg?: string,
  data?: { [key: string]: unknown },
) => {
  console.error(error);

  Sentry.addBreadcrumb({
    level: 'info',
    message: msg,
    data,
  });

  Sentry.captureException(error);
};

const captureErrorMessage = (message: string) => {
  Sentry.captureMessage(message);
};

export { captureException, captureErrorMessage, Sentry };
