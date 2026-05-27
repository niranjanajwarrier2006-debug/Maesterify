// @ts-ignore
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maesterify – Grand Academic Archive',
  description: 'Full-stack ancient book archive and owl distribution system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}