import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from './providers';

export const metadata: Metadata = {
  title: 'Token Discovery | Eterna Task',
  description: 'Token trading table – Axiom Pulse replica',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050509] text-slate-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
