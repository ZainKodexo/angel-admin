'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllEmails } from '../actions';
import { EmailQueryKey } from '../utils';

export const useGetAllEmails = (language: string) => {
  const response = useQuery({
    queryFn: () => getAllEmails({ language }),
    queryKey: EmailQueryKey.email.all(language),
  });
  return response;
};
