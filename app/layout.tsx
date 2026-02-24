import './globals.css';
import { Shell } from '@/components/shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ALLoul One Hub',
  description: 'Hybrid professional network + workspace + AI memory platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
