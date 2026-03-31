import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'США 2026 — Маршрут',
  description: '21 день · 7 городов · 2 океана',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/usa-plan/manifest.json" />
        <meta name="theme-color" content="#0d0d0d" />
        <link rel="apple-touch-icon" href="/usa-plan/icons/icon-192.png" />
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/usa-plan/sw.js')}`,
          }}
        />
      </body>
    </html>
  );
}
