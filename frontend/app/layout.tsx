import { Inter } from 'next/font/google';
import { AppProviders } from '@/lib/providers/AppProviders';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CallbackListener - Webhook Monitoring Dashboard',
  description: 'A modern webhook monitoring dashboard for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}