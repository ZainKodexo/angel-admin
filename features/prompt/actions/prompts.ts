'use server';
import { api } from '@/shared/lib';
import { PaginatedResponse } from '@/shared/types';
import { TPrompt } from '../types';

export const getAllPrompts = async () => {
  return await api.get<PaginatedResponse<TPrompt>>(
    '/prompts/?page=1&page_size=10&sort_order=-1',
  );
};

export const updatePrompt = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  return await api.put(`/prompts/${id}`, { content });
};
