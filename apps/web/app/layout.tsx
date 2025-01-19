import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'H1V3M1ND - Mission Board',
//   description: 'A decentralized mission board for human and AI agent coordination.',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 to-black text-white`}
      >
        <div className="flex flex-col min-h-screen pt-[72px]">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 mb-[180px]">{children}</main>
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <Footer />
          </div>
        </div>
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--cyber-darker)',
              border: '1px solid var(--cyber-purple)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
