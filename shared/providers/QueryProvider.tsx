'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
