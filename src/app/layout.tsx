import type { Metadata, Viewport } from 'next';
import './globals.css';
import QueryProvider from '@/components/QueryProvider';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: 'Felix AI',
  description: 'Your intelligent feline assistant',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Felix',
  },
  icons: {
    icon: '/felix-192.png',
    apple: '/felix-touch.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
