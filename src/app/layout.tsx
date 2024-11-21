import "./globals.css";
import { ReactNode } from 'react';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Energia Sustentável Para Todos',
  description: 'Projeto de energia sustentável usando Next.js e Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
