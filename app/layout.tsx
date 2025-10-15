import { ThemeProvider } from '@/shared/components';
import { GlobalModal } from '@/shared/components';
import { Recursive } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { ReactQueryProvider } from '@/shared/providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const inter = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Angel Admin',
  description: 'PROJECT DESCRIPTION',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NuqsAdapter>
            <ReactQueryProvider>
              <NextTopLoader showSpinner={false} color="#759b6d" />
              <Toaster richColors />
              {children}
              <GlobalModal />
            </ReactQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
