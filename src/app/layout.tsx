import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic'] });

import { ThemeProvider } from '@/components/providers/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Документация welpodron.docs',
  description: 'Документация welpodron.docs',
  keywords: 'javascript, react, nextjs, typescript, css, html, php, bitrix',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
