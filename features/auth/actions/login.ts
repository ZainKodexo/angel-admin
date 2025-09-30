'use server';

import { api } from '@/shared/lib';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await api.post('/auth/jwt/login', {
    email,
    password,
  });

  return data;
};

export { login };
