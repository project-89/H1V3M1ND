import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'H1V3M1ND - Mission Board',
  description: 'A decentralized mission board for human and AI agent coordination.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 to-black text-white`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
