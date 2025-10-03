'use client';
import { Skeleton } from '@/shared/components/server';
import { useGetAllEmails } from '../hooks';
import { EmailTemplate } from './EmailTemplate';
import { EmailsNotFound } from './EmailsNotFound';

export const Email = () => {
  return <EmailContent />;
};

const EmailContent = () => {
  const { data, isLoading } = useGetAllEmails();

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    );
  }

  if (!data?.data?.data) {
    return <EmailsNotFound />;
  }

  return (
    <div className="space-y-4">
      {data.data.data.map((prompt) => (
        <EmailTemplate key={prompt.id} {...prompt} />
      ))}
    </div>
  );
};
