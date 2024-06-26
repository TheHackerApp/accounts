import { config } from '@fortawesome/fontawesome-svg-core';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import MaintenanceCard from '@/components/MaintenanceCard';
import NextUIProvider from '@/components/NextUIProvider';
import { ApolloClientProvider } from '@/graphql/clients/provider';
import { cn } from '@/lib/styles';

import '@fortawesome/fontawesome-svg-core/styles.css';
import './tailwind.css';

const MAINTENANCE = (process.env.MAINTENANCE ?? '').toLowerCase().charAt(0) == 't';

const inter = Inter({ subsets: ['latin'] });
config.autoAddCss = false;

export const metadata = {
  title: 'Settings - The Hacker App',
};

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'h-dvh')}>
        <ApolloClientProvider>
          <NextUIProvider>
            <ThemeProvider attribute="class">
              {MAINTENANCE ? <MaintenanceCard /> : children}
              <Toaster position="top-right" toastOptions={{ className: 'toast' }} />
            </ThemeProvider>
          </NextUIProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
