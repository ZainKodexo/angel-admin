'use client';
import { useRouter } from 'next/navigation';
import { BaseError } from './BaseError';

const NotFoundComponent = () => {
  const router = useRouter();

  return (
    <BaseError
      title="404"
      subtitle="Oops! Page Not Found"
      description="Sorry, the page you're looking for doesn't exist or has been moved."
      textButton="Go Back to Homepage"
      onClick={() => router.push(`/`)}
    />
  );
};

export { NotFoundComponent };
