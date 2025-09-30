'use client';

import { RuntimeException } from '@/shared/components';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return <RuntimeException error={error} reset={reset} />;
};

export default Error;
