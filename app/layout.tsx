import { ThemeProvider } from '@/shared/components';
import { GlobalModal } from '@/shared/components';
import { Recursive } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PROJECT NAME',
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
        <ThemeProvider attribute="class" enableSystem>
          <NextTopLoader showSpinner={false} color="#ffffff" />
          <Toaster />
          {children}
          <GlobalModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
