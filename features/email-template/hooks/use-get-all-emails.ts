'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllEmails } from '../actions';
import { EmailQueryKey } from '../utils';

export const useGetAllEmails = () => {
  const response = useQuery({
    queryFn: getAllEmails,
    queryKey: EmailQueryKey.email.all,
  });
  return response;
};
