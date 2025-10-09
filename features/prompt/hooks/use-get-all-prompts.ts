'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllPrompts } from '../actions';
import { PromptQueryKey } from '../utils';

export const useGetAllPrompts = () => {
  const response = useQuery({
    queryFn: getAllPrompts,
    queryKey: PromptQueryKey.prompt.all,
  });
  return response;
};
