'use server';
import { api } from '@/shared/lib';
import { PaginatedResponse } from '@/shared/types';
import { TEmail } from '../types';

export const getAllEmails = async ({
  language = 'English',
}: {
  language?: string;
}) => {
  const params = new URLSearchParams(
    `/email-content/?page=1&page_size=10&sort_order=-1`,
  );
  if (language) {
    params.set('language', language);
  }
  return await api.get<PaginatedResponse<TEmail>>(
    decodeURIComponent(params.toString()),
  );
};

export const updateEmail = async ({
  id,
  html_content,
}: {
  id: string;
  html_content: string;
}) => {
  return await api.put(`/email-content/${id}`, { html_content });
};
